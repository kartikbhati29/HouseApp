import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";

import { getDistance } from "geolib";
import {
  formatDistance,
  sendNotificationToAdmin,
  sendNotificationToUser,
} from "../../helpers/helperFunctions";

export default function HomeDetails() {
  const route = useRoute();
  let houseData = route?.params?.data;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [permissionAvailable, setPermissionAvailable] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [available, setAvailable] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const dimensions = Dimensions.get("screen");
  const minDistance = 30;

  const handleBack = () => navigation.goBack();

  const checkForDistance = () => {
    if (permissionAvailable) {
      setAvailable(calculateDistance < minDistance ? true : false);
    }
  };

  const handleLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  const calculateDistance = React.useMemo(
    function () {
      const distance = getDistance(
        {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        {
          latitude: houseData?.latitude,
          longitude: houseData?.longitude,
        }
      );
      setAvailable(distance <= minDistance ? true : false);
      return distance;
    },
    [location.latitude, location.longitude]
  );

  const handleUnlock = async () => {
    await Location.requestForegroundPermissionsAsync();
    const locationData = await Location.getCurrentPositionAsync();
    const distance = getDistance(
      {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      },
      {
        latitude: houseData?.latitude,
        longitude: houseData?.longitude,
      }
    );
    if (distance < minDistance) {
      Alert.alert("Home Unlocked", `${houseData?.projectName} is unlocked`);
      setUnlocked(true);
      sendNotificationToUser();
      sendNotificationToAdmin();
    } else {
      Alert.alert(
        "OOPs Sorry",
        `${houseData?.projectName} is ${Number(distance / 10000).toFixed(
          2
        )} kms away from your loaction`
      );
    }
  };

  const askPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      checkForDistance();
    } else {
      Alert.alert(
        "Location access",
        "Location access is required for unlock feature. Please enable loaction",
        [
          {
            text: "Give Permission",
            onPress: async () => {
              askPermission();
            },
            style: "default",
          },
        ]
      );
      return;
    }
  };

  const checkForPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setPermissionAvailable(true);
      const locationData = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    }
  };

  React.useEffect(() => {
    askPermission();
    checkForPermission();
    const time = setInterval(() => {
      checkForDistance();
    }, 5000);
    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <View style={[styles.detailsContainer, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={{ fontSize: 18 }}>{"Back"}</Text>
        </Pressable>
        <Text style={[styles.title]}>{"Details"}</Text>
      </View>
      <Image
        src={houseData.image}
        style={{
          width: dimensions.width,
          height: dimensions.height / 3,
        }}
      />
      <View style={styles.bottomDetails}>
        <Text style={styles.title}>{houseData?.projectName}</Text>
        <Text style={[styles.details, { marginTop: 12 }]}>
          {houseData?.about}
        </Text>
        <View style={styles.bottomBar}>
          {unlocked ? (
            <Text style={[styles.buttonText]}>{"Welcome"}</Text>
          ) : (
            <>
              {permissionAvailable ? (
                <Text style={[styles.buttonTextSmall]}>{`${formatDistance(
                  calculateDistance
                )} kms `}</Text>
              ) : (
                <Pressable
                  style={styles.unlockButton}
                  onPress={handleLocationPermission}
                >
                  <Text style={[styles.buttonText]}>{"Give Permission"}</Text>
                </Pressable>
              )}
              {available && (
                <Pressable style={styles.unlockButton} onPress={handleUnlock}>
                  <Text style={[styles.buttonText]}>{"Unlock"}</Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  title: {
    fontSize: 24,
  },
  details: {
    fontSize: 14,
  },
  blue: {
    color: "blue",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 12,
  },
  bottomDetails: {
    padding: 12,
    flex: 1,
  },
  bottomBar: {
    width: "100%",
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
  buttonTextSmall: {
    fontSize: 16,
  },
  unlockButton: {
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#d3d3d3",
  },
});

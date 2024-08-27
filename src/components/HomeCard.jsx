import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeCard({ data }) {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate("HomeDetails", { data: data });
  };

  return (
    <View style={styles.cardContainer}>
      <Image src={data.image} style={styles.image} />
      <View style={styles.descriptionBox}>
        <Text style={styles.heading}>{data.projectName}</Text>
        <Text style={styles.subHeading}>{data.localityName}</Text>
        {/* <Text style={styles.description}>{data.about}</Text> */}
        <View style={styles.bottomContainer}>
          <Text style={styles.developed}>
            {`developed by - `}
            <Text style={styles.developerName}>{data.developerName}</Text>
          </Text>
          <Pressable style={styles.button} onPress={handleNavigation}>
            <Text>{"View"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 4,
    marginVertical: 12,
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("screen").width - 40,
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  descriptionBox: {
    borderWidth: 1,
    width: "100%",
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
    borderColor: "#d3d3d3",
  },

  heading: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "500",
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
  },
  description: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "300",
  },
  bottomContainer: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  developed: {
    fontSize: 10,
  },
  developerName: {
    fontSize: 12,
  },
  button: {
    padding: 6,
    borderRadius: 12,
    paddingHorizontal: 24,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
  },
});

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { houseData, sampleHouseData } from "../../helpers/sampleData";
import HomeCard from "../../components/HomeCard";

export default function Home() {
  const [houseData, setHouseData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const renderItem = ({ item }) => {
    return <HomeCard data={item} />;
  };

  const fetchHouseData = () => {
    setTimeout(() => {
      setHouseData(sampleHouseData);
    }, 300);
  };

  React.useEffect(() => {
    fetchHouseData();
  });

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.heading}>{`View Homes ${
        houseData.length > 0 ? `(${houseData.length})` : ""
      }`}</Text>
      <FlatList
        data={houseData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyLoader}>
            <ActivityIndicator animating={true} color={"blue"} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
  emptyLoader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

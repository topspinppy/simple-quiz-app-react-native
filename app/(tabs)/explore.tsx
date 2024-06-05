import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import Leaderboard from "react-native-leaderboard";

let getData = async (setData: any) => {
  let leaderboardData = await AsyncStorage.getItem("leaderBoard");
  setData(JSON.parse(leaderboardData as any));
};

export default function TabTwoScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(setData);
  }, [setData]);

  return (
    <SafeAreaView>
      <Text style={styles.HeadLeaderboard}>LeaderBoard 📊</Text>
      <Leaderboard data={data ? [...data] : []} sortBy="score" labelBy="name" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HeadLeaderboard: {
    fontSize: 25,
    textAlign: "center",
    padding: 20,
  },
});

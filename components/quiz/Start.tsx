import { View, Text, StyleSheet, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function TitleBar() {
  return (
    <>
      <LinearGradient
        colors={["#051937", "#004d7a", "#008793", "#00bf72", "#a8eb12"]}
        style={styles.container}
      >
        <Text style={{ fontSize: 40, textAlign: "center", color: 'white' }}>Basic Quiz</Text>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    margin: 50,
    borderRadius: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

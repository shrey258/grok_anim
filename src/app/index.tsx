import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#151518", "#2B3037"]} style={styles.background}>
        <Text style={styles.text}>Gradient Background</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 20 },
});

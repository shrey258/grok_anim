import { LinearGradient } from "expo-linear-gradient";
import { AudioLines } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { WidgetCard } from "../components/WidgetCard";

export default function Index() {
  return (
      <LinearGradient colors={["#151518", "#2B3037"]} style={styles.background}>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <WidgetCard icon={AudioLines} label="Voice Mode" />
        </View>

      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

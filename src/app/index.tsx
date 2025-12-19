import { LinearGradient } from "expo-linear-gradient";
import { AudioLines, ImagePlus, Fullscreen } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { WidgetCard } from "../components/WidgetCard";

export default function Index() {
  return (
    <LinearGradient colors={["#151518", "#2B3037"]} style={styles.background}>
      <View style={styles.optionRow}>
        <WidgetCard icon={AudioLines} label="Voice Mode" />
        <WidgetCard icon={ImagePlus} label="Create Images" />
        <WidgetCard icon={Fullscreen} label="Edit Image" />
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
  optionRow: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
    overflow: "hidden",
  },
});

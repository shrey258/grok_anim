import { LinearGradient } from "expo-linear-gradient";
import { AudioLines, Fullscreen, ImagePlus } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { PromptInput } from "../components/PromptInput";
import { WidgetCard } from "../components/WidgetCard";

export default function Index() {
  return (
    <LinearGradient colors={["#151518", "#2B3037"]} style={styles.background}>
      <View style={styles.stack}>
        <View style={styles.optionRow}>
          <WidgetCard icon={AudioLines} label="Voice Mode" />
          <WidgetCard icon={ImagePlus} label="Create Images" />
          <WidgetCard icon={Fullscreen} label="Edit Image" />
        </View>
        <View style={styles.inputContainer}>
          <PromptInput />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  stack: {
    gap: 6,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    overflow: "visible",
    width: "100%",
    alignSelf: "stretch",
  },
  inputContainer: {
    width: "100%",
    marginTop: 16,
  },
});

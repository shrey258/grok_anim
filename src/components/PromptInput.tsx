import { GlassView } from "expo-glass-effect";
import {
    ChevronDown,
    Lightbulb,
    Mic,
    Orbit,
    Paperclip
} from "lucide-react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function PromptInput() {
  return (
    <GlassView glassEffectStyle="clear" style={styles.container}>
      <View style={styles.content}>
        <TextInput 
          style={styles.input}
          placeholder="Ask Anything"
          placeholderTextColor="#97979B"
          multiline
        />
        
        <View style={styles.controlsRow}>
            {/* Left Actions */}
            <View style={styles.leftActions}>
                <TouchableOpacity style={styles.iconButton}>
                    <Paperclip size={20} color="#E0E0E0" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Orbit size={20} color="#E0E0E0" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.iconButton}>
                    <Lightbulb size={20} color="#E0E0E0" />
                </TouchableOpacity>
            </View>

            {/* Right Actions */}
            <View style={styles.rightActions}>
                <TouchableOpacity style={styles.modelSelector}>
                    <Text style={styles.modelText}>Grok 3</Text>
                    <ChevronDown size={16} color="#E0E0E0" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.iconButton}>
                    <Mic size={20} color="#E0E0E0" />
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 26,
    overflow: "hidden",
    width: "100%",
    alignSelf: "center",
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
    width: "100%",
  },
  input: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 2,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftActions: {
    flexDirection: "row",
    gap: 10,
  },
  rightActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    justifyContent: "center",
    alignItems: "center",
  },
  modelSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    gap: 6,
  },
  modelText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

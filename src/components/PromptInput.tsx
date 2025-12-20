import { GlassView } from "expo-glass-effect";
import {
  ChevronDown,
  Lightbulb,
  Mic,
  Orbit,
  Paperclip,
  Square,
} from "lucide-react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import Animated, { Easing, Keyframe } from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedSquare = Animated.createAnimatedComponent(Square);
const AnimatedMic = Animated.createAnimatedComponent(Mic);

const CustomZoomIn = new Keyframe({
  from: {
    transform: [{ scale: 0 }],
    opacity: 0,
  },
  to: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.inOut(Easing.quad),
  },
}).duration(200);

const CustomZoomOut = new Keyframe({
  from: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  to: {
    transform: [{ scale: 0 }],
    opacity: 0,
    easing: Easing.inOut(Easing.quad),
  },
}).duration(200);

export function PromptInput() {
  const [recording, setRecording] = useState(false);

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

            <AnimatedTouchableOpacity
              onPress={() => setRecording(!recording)}
              style={[
                styles.iconButton,
                {
                  transitionProperty: "backgroundColor",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                  backgroundColor: recording
                    ? "white"
                    : "rgba(255, 255, 255, 0.07)",
                },
              ]}
            >
              {recording ? (
                <AnimatedSquare
                  key="square"
                  entering={CustomZoomIn}
                  exiting={CustomZoomOut}
                  size={20}
                  color="black"
                />
              ) : (
                <AnimatedMic
                  key="mic"
                  entering={CustomZoomIn}
                  exiting={CustomZoomOut}
                  size={20}
                  color="#E0E0E0"
                />
              )}
            </AnimatedTouchableOpacity>
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

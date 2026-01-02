import {
  BlurMask,
  Canvas,
  Circle,
  Group
} from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
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
  useWindowDimensions,
} from "react-native";

import { forwardRef, useEffect, useState } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  Keyframe,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedSquare = Animated.createAnimatedComponent(Square);
const AnimatedMic = Animated.createAnimatedComponent(Mic);

// BlurView shell that keeps children; needed because Animated version drops the children prop in TS types.
const BlurShell = forwardRef((props: any, ref) => <BlurView ref={ref} {...props} />);
BlurShell.displayName = "BlurShell";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurShell);

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
  const { width: screenWidth } = useWindowDimensions();
  // Approximate width of the input container (screen width - padding)
  const canvasWidth = screenWidth - 32;
  const canvasHeight = 150; // Approximate height

  const x1 = useSharedValue(0);
  const y1 = useSharedValue(0);
  const x2 = useSharedValue(canvasWidth);
  const y2 = useSharedValue(canvasHeight);

  useEffect(() => {
    x1.value = withRepeat(
      withTiming(canvasWidth, { duration: 4000, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
    y1.value = withRepeat(
      withTiming(canvasHeight, { duration: 5000, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
    x2.value = withRepeat(
      withTiming(0, { duration: 4500, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
    y2.value = withRepeat(
      withTiming(0, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [canvasWidth, canvasHeight, x1, x2, y1, y2]);

  const cx1 = useDerivedValue(() => x1.value);
  const cy1 = useDerivedValue(() => y1.value);
  const cx2 = useDerivedValue(() => x2.value);
  const cy2 = useDerivedValue(() => y2.value);

  const renderContent = () => (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder={recording ? "Listening" : "Ask Anything"}
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
            <AnimatedBlurView
              entering={CustomZoomIn}
              exiting={CustomZoomOut}
              intensity={recording ? 24 : 14}
              tint="dark"
              style={styles.iconBlur}
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
            </AnimatedBlurView>
          </AnimatedTouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <GlassView glassEffectStyle="clear" style={styles.container}>
      <View style={styles.backgroundWrap}>
        {recording && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(180)}
            style={styles.gradient}
          >
            <Canvas style={{ flex: 1 }}>
              <Group>
                <Circle cx={cx1} cy={cy1} r={160} color="#2DD4BF" />
                <Circle cx={cx2} cy={cy2} r={160} color="#3B82F6" />
                <BlurMask blur={360} style="normal" />
              </Group>
            </Canvas>
          </Animated.View>
        )}
        {renderContent()}
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
  backgroundWrap: {
    width: "100%",
    overflow: "hidden",
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
    width: "100%",
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
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
    overflow: "hidden",
  },
  iconBlur: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
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

import { GlassView } from "expo-glass-effect";
import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type WidgetCardProps = {
  icon: LucideIcon;
  label: string;
};

export function WidgetCard({ icon: Icon, label }: WidgetCardProps) {
  return (
    <GlassView glassEffectStyle="clear" style={styles.glassContainer}>
      <View style={styles.widgetContent}>
        <Icon size={18} color="#97979B" />
        <Text style={styles.text}>{label}</Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    padding: 20,
    borderRadius: 24,
  },

  widgetContent: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 15,
  },

  text: { color: "white", fontSize: 14 },
});

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
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  widgetContent: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 15,
  },

  text: { color: "white", fontSize: 13 },
});

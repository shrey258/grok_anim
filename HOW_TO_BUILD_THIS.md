# 🧪 Mixing Potions: Building a "Living" Input Field with Skia & Reanimated

You know those UI elements that just feel... _alive_? Like they're breathing? I wanted that vibe for my Prompt Input widget. Not just a boring text box, but something that wakes up when you poke it.

So I built a mesh-gradient-powered, glass-morphic, animated input field. And guess what? It’s actually just a few circles wearing a blur mask. 🤫

Here's the recipe.

## 🥘 The Ingredients

- **React Native Skia**: For drawing high-performance 2D graphics (our glowing blobs).
- **React Native Reanimated**: To make those blobs dance without killing the JS thread.
- **Expo Blur & Glass-Effect**: Because everything looks better frosted. 🧊

## 1. The "Fake" Mesh Gradient

Real mesh gradients involve complicated shaders and math. I don't like math. I like cheating.

Instead of writing GLSL code, we just draw two colored circles on a canvas and blur them until they look like a single, dreamy soup.

### Behind the Scenes: The Raw Circles

Before we add the blur, you can see how the circles are actually moving. It’s just simple geometry drifting in a loop.


https://github.com/user-attachments/assets/055b39b7-48dc-4e77-a32b-ccb89bfe9ee1




### The Magic: Adding the Blur

When you blur those same overlapping circles by **360px**, they stop looking like geometry and start looking like a fluid gradient. It’s cheap, fast, and looks identical to the expensive stuff.



https://github.com/user-attachments/assets/eec73170-a5db-4cdb-9d29-50499acf8b78



```tsx
<Canvas style={{ flex: 1 }}>
  <Group>
    {/* The Teal Blob */}
    <Circle cx={cx1} cy={cy1} r={160} color="#2DD4BF" />
    
    {/* The Blue Blob */}
    <Circle cx={cx2} cy={cy2} r={160} color="#3B82F6" />
    
    {/* The Magic Sauce: Blur everything by 360px */}
    <BlurMask blur={360} style="normal" />
  </Group>
</Canvas>
```

When you blur two overlapping circles by **360px**, they stop looking like geometry and start looking like a fluid gradient. It’s cheap, fast, and looks identical to the expensive stuff.

## 2. Making it Move (The Lava Lamp Effect)

Static blobs are boring. We want them to drift around like a lava lamp.

I used `SharedValues` for the X and Y coordinates of each circle. Then I told Reanimated to move them back and forth forever using `withRepeat`.

```tsx
// Inside your component
const x1 = useSharedValue(0);
const y1 = useSharedValue(0);

useEffect(() => {
  // Move x1 from 0 to canvasWidth over 4 seconds, then back
  x1.value = withRepeat(
    withTiming(canvasWidth, { 
      duration: 4000, 
      easing: Easing.inOut(Easing.quad) 
    }),
    -1, // -1 means "repeat forever"
    true // true means "reverse direction on repeat" (yoyo effect)
  );
  
  // ... repeat for y1, x2, y2 with slightly different durations
  // using different durations (e.g. 4000ms vs 5000ms) makes it look random!
}, []);
```

**Pro Tip:** Use slightly different durations for every axis (4s, 5s, 4.5s, 3.5s). This creates a chaotic interference pattern so the user never sees the same loop twice. It feels organic. 🌱

## 3. Connecting Reanimated to Skia

Skia doesn't understand Reanimated SharedValues directly in the render loop. We bridge the gap with `useDerivedValue`.

```tsx
// Create derived values that update on the UI thread
const cx1 = useDerivedValue(() => x1.value);
const cy1 = useDerivedValue(() => y1.value);

// Pass these directly to the <Circle /> props!
<Circle cx={cx1} cy={cy1} ... />
```

Now our canvas updates at 60 (or 120) FPS without a single re-render of the React component. smooth_operator.mp3 🎵

## 4. The "Mic Drop" Interaction

When the user taps the microphone, we don't just swap the icon. We transform the entire vibe.

1. **State Change**: `recording` becomes true.
2. **Fade In**: The Skia canvas `FadesIn` behind the input.
3. **Blur Intensity**: The button's frosted glass gets "frosted-er" (intensity 14 -> 24).
4. **Icon Morph**: The Mic icon zooms out, and a Stop square zooms in.

```tsx
<AnimatedTouchableOpacity onPress={() => setRecording(!recording)}>
  <AnimatedBlurView intensity={recording ? 24 : 14}>
    {recording ? (
      <AnimatedSquare entering={CustomZoomIn} exiting={CustomZoomOut} />
    ) : (
      <AnimatedMic entering={CustomZoomIn} exiting={CustomZoomOut} />
    )}
  </AnimatedBlurView>
</AnimatedTouchableOpacity>
```

We defined `CustomZoomIn` using `Keyframe` to get that snappy pop effect:

```tsx
const CustomZoomIn = new Keyframe({
  from: { transform: [{ scale: 0 }], opacity: 0 },
  to: { 
    transform: [{ scale: 1 }], 
    opacity: 1, 
    easing: Easing.inOut(Easing.quad) 
  },
});
```

## 5. Wrapping it in Glass

Finally, the whole thing sits inside a `GlassView`. This gives us that premium, iOS-style blur that separates our widget from the background content.

```tsx
<GlassView glassEffectStyle="clear" style={styles.container}>
  <View style={styles.backgroundWrap}>
     {/* The glowing gradient lives here, absolutely positioned */}
     {recording && <AnimatedGradient ... />}
     
     {/* The actual text input and buttons live on top */}
     {renderContent()}
  </View>
</GlassView>
```

## Result?

An input field that feels like a portal. It rests quietly when you don't need it, and comes alive with a warm, organic glow when you start talking.

Go build something fun! 🚀

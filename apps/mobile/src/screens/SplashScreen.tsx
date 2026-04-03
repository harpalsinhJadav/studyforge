import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Svg, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const loaderWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo scales in
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Wordmark + tagline fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();

      // Loader bar fills
      Animated.timing(loaderWidth, {
        toValue: 1,
        duration: 1600,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) onFinish();
      });
    });
  }, []);

  const loaderFillWidth = loaderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Hexagon logo mark */}
      <Animated.View
        style={[
          styles.hexWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Svg width={40} height={40} viewBox="0 0 36 36" fill="none">
          <Path
            d="M18 4L30 11v14L18 32 6 25V11z"
            fill="#7C6FF7"
            fillOpacity={0.3}
          />
          <Path
            d="M18 4L30 11v14L18 32 6 25V11z"
            stroke="#7C6FF7"
            strokeWidth={1.5}
            fill="none"
          />
          <SvgText
            x="18"
            y="23"
            textAnchor="middle"
            fontFamily="Syne-Bold"
            fontSize={13}
            fontWeight="700"
            fill="#7C6FF7"
          >
            SF
          </SvgText>
        </Svg>
      </Animated.View>

      {/* Wordmark + tagline */}
      <Animated.View style={[styles.textGroup, { opacity: textOpacity }]}>
        <Text style={styles.wordmark}>
          Study<Text style={styles.wordmarkAccent}>Forge</Text>
        </Text>
        <Text style={styles.tagline}>AI LEARNING ENGINE</Text>
      </Animated.View>

      {/* Loader bar */}
      <Animated.View style={[styles.loaderTrack, { opacity: textOpacity }]}>
        <Animated.View
          style={[styles.loaderFill, { width: loaderFillWidth }]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D18',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  hexWrap: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(124,111,247,0.10)',
    borderWidth: 2,
    borderColor: '#7C6FF7',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    alignItems: 'center',
    gap: 6,
  },
  wordmark: {
    fontFamily: 'Syne-ExtraBold',
    fontSize: 26,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  wordmarkAccent: {
    color: '#7C6FF7',
  },
  tagline: {
    fontFamily: 'DMSans-Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.30)',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  loaderTrack: {
    width: 56,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 32,
  },
  loaderFill: {
    height: '100%',
    backgroundColor: '#7C6FF7',
    borderRadius: 2,
  },
});

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  bg: '#0d0d14',
  surface: '#18182a',
  border: '#3c3489',
  violet: '#7f77dd',
  violetDark: '#534ab7',
  cyan: '#4eaaff',
  textPrimary: '#e8e6ff',
  textMuted: '#afa9ec',
  barTrack: '#1e1e30',
};

type Particle = {
  id: number;
  x: number;
  anim: Animated.Value;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

const PARTICLE_COLORS = [
  COLORS.violet,
  COLORS.cyan,
  COLORS.violetDark,
  COLORS.textMuted,
];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * (width - 20) + 10,
    anim: new Animated.Value(0),
    size: Math.random() * 4 + 2,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    duration: Math.random() * 1500 + 2000,
    delay: Math.random() * 2000,
  }));
}

function ParticleItem({ particle }: { particle: Particle }) {
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(particle.delay),
        Animated.timing(particle.anim, {
          toValue: 1,
          duration: particle.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(particle.anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [particle]);

  const translateY = particle.anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 0.5],
  });

  const opacity = particle.anim.interpolate({
    inputRange: [0, 0.15, 0.85, 1],
    outputRange: [0, 0.7, 0.3, 0],
  });

  const scale = particle.anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.3],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: particle.x,
          bottom: Math.random() * 80 + 20,
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size / 2,
          backgroundColor: particle.color,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    />
  );
}

function LogoIcon() {
  return (
    <View style={styles.logoIcon}>
      <View style={styles.iconScreen}>
        <View style={styles.iconCircleOuter}>
          <View style={styles.iconCircleInner} />
        </View>
        <View style={styles.iconTagLeft} />
        <View style={styles.iconTagRight} />
      </View>
      <View style={styles.iconTickerBar}>
        <View style={styles.iconTickerFill} />
      </View>
    </View>
  );
}

type SplashScreenProps = {
  onFinish?: () => void;
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.85)).current;
  const [particles] = useState(() => createParticles(10));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2800,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => onFinish?.());
        }, 300);
      }
    });

    const progressListener = progressAnim.addListener(({ value }) => {
      setProgress(Math.round(value * 100));
    });
    return () => progressAnim.removeListener(progressListener);
  }, [fadeAnim, logoScaleAnim, onFinish, progressAnim]);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 0.55, 0.8, 1],
    outputRange: ['0%', '75%', '92%', '100%'],
  });

  const barColor = progressAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [COLORS.violet, COLORS.violet, COLORS.cyan],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {particles.map(p => (
        <ParticleItem key={p.id} particle={p} />
      ))}

      <Animated.View
        style={[
          styles.content,
          { transform: [{ scale: logoScaleAnim }] },
        ]}>
        <LogoIcon />

        <View style={styles.titleRow}>
          <Text style={styles.titleMeme}>Meme</Text>
          <Text style={styles.titleTicker}>Ticker</Text>
        </View>

        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: barWidth,
                backgroundColor: barColor,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>{progress}%</Text>
      </Animated.View>
    </Animated.View>
  );
}

const ICON_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  iconScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconCircleOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.violetDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.textMuted,
  },
  iconTagLeft: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.violet,
    opacity: 0.6,
  },
  iconTagRight: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.cyan,
    opacity: 0.6,
  },
  iconTickerBar: {
    height: 14,
    backgroundColor: '#0d2240',
    flexDirection: 'row',
  },
  iconTickerFill: {
    width: '48%',
    backgroundColor: COLORS.cyan,
    opacity: 0.85,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  titleMeme: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  titleTicker: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.violet,
    letterSpacing: -0.5,
  },
  barTrack: {
    width: 140,
    height: 3,
    backgroundColor: COLORS.barTrack,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 20,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

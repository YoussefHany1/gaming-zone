import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function HeaderCarousel({ items, onItemPress }) {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Auto-scroll functionality
    const interval = setInterval(() => {
      if (scrollViewRef.current && items.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(items.length, 10));
        scrollViewRef.current.scrollTo({
          x: randomIndex * width,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {items.slice(0, 10).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.slide}
            onPress={() => onItemPress && onItemPress(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            >
              <Text style={styles.title} numberOfLines={3}>
                {item.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: theme.spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
    lineHeight: 24,
  },
});
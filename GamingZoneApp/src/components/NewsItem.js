import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { theme } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function NewsItem({ item, onPress, showImage = true }) {
  const handlePress = () => {
    onPress && onPress(item);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {showImage && (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          placeholder="https://via.placeholder.com/300x200?text=Loading..."
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.processedDescription?.substring(0, 150) || 'No description available'}...
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{item.websiteName}</Text>
          <Text style={styles.date}>
            {item.pubDate ? new Date(item.pubDate).toLocaleDateString() : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: theme.borderRadius.medium,
    borderTopRightRadius: theme.borderRadius.medium,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.darkGray,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  description: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.gray,
  },
});
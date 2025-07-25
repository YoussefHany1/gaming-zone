import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFetchNews } from '../hooks/useFetchNews';
import { rssUrls } from '../constants/rssUrls';
import NewsItem from '../components/NewsItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { theme } from '../constants/theme';

export default function NewsScreen({ navigation }) {
  const [selectedSource, setSelectedSource] = useState(rssUrls.news[0]);
  const [visibleCount, setVisibleCount] = useState(10);

  const { items, loading, error } = useFetchNews([selectedSource.url]);

  const handleItemPress = (item) => {
    navigation.navigate('ArticleDetail', { article: item });
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load news" />;
  }

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#1b263a', '#3d5b92']}
      style={styles.container}
    >
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select News Source:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSource}
            onValueChange={(itemValue) => {
              setSelectedSource(itemValue);
              setVisibleCount(10);
            }}
            style={styles.picker}
            dropdownIconColor={theme.colors.white}
          >
            {rssUrls.news.map((source) => (
              <Picker.Item
                key={source.id}
                label={source.name}
                value={source}
                color={theme.colors.darkGray}
              />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {items.slice(0, visibleCount).map((item, index) => (
          <NewsItem
            key={index}
            item={item}
            onPress={handleItemPress}
          />
        ))}
        
        {visibleCount < items.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  pickerLabel: {
    color: theme.colors.white,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  pickerWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
  },
  picker: {
    height: 50,
  },
  scrollView: {
    flex: 1,
  },
  loadMoreButton: {
    backgroundColor: theme.colors.secondary,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },
  loadMoreText: {
    color: theme.colors.white,
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
  },
});
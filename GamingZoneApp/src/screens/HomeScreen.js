import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFetchNews } from '../hooks/useFetchNews';
import { rssUrls } from '../constants/rssUrls';
import HeaderCarousel from '../components/HeaderCarousel';
import NewsItem from '../components/NewsItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { theme } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const {
    items: headerItems,
    loading: headerLoading,
    error: headerError
  } = useFetchNews(['https://www.destructoid.com/feed/']);

  const {
    items: newsItems,
    loading: newsLoading,
    error: newsError
  } = useFetchNews(['https://www.gameinformer.com/rss.xml']);

  const handleItemPress = (item) => {
    navigation.navigate('News', {
      screen: 'ArticleDetail',
      params: { article: item }
    });
  };

  if (headerLoading || newsLoading) {
    return <LoadingSpinner />;
  }

  if (headerError || newsError) {
    return <ErrorMessage message="Failed to load news" />;
  }

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#1b263a', '#3d5b92']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeaderCarousel items={headerItems} onItemPress={handleItemPress} />
        
        <View style={styles.newsSection}>
          {newsItems.slice(0, 10).map((item, index) => (
            <NewsItem
              key={index}
              item={item}
              onPress={handleItemPress}
            />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  newsSection: {
    paddingBottom: theme.spacing.xl,
  },
});
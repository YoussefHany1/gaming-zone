import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export default function ArticleDetailScreen({ route, navigation }) {
  const { article } = route.params;

  const handleOpenLink = async () => {
    try {
      await Linking.openURL(article.link);
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const handleShare = async () => {
    try {
      const { Share } = await import('react-native');
      await Share.share({
        message: `${article.title}\n\n${article.link}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary, '#1b263a', '#3d5b92']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: article.image }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          
          <View style={styles.meta}>
            <Text style={styles.source}>{article.websiteName}</Text>
            <Text style={styles.date}>
              {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : ''}
            </Text>
          </View>
          
          <Text style={styles.description}>
            {article.processedDescription || 'No description available.'}
          </Text>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleOpenLink}>
              <Ionicons name="open-outline" size={20} color={theme.colors.white} />
              <Text style={styles.actionText}>Read Full Article</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color={theme.colors.white} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
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
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.md,
    lineHeight: 28,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  source: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.gray,
  },
  description: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.white,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  actionText: {
    color: theme.colors.white,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
});
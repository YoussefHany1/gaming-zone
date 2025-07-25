import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';
import ReviewsScreen from './src/screens/ReviewsScreen';
import HardwareScreen from './src/screens/HardwareScreen';
import ContactScreen from './src/screens/ContactScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';

// Import theme
import { theme } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for News section
function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen name="NewsList" component={NewsScreen} options={{ title: 'Latest News' }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ title: 'Article' }} />
    </Stack.Navigator>
  );
}

// Stack navigator for Reviews section
function ReviewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen name="ReviewsList" component={ReviewsScreen} options={{ title: 'Reviews' }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ title: 'Review' }} />
    </Stack.Navigator>
  );
}

// Stack navigator for Hardware section
function HardwareStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen name="HardwareList" component={HardwareScreen} options={{ title: 'Hardware' }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ title: 'Hardware' }} />
    </Stack.Navigator>
  );
}

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Reviews') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Hardware') {
            iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'mail' : 'mail-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: theme.colors.secondary,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        },
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Gaming Zone' }} />
      <Tab.Screen name="News" component={NewsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Reviews" component={ReviewsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Hardware" component={HardwareStack} options={{ headerShown: false }} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <MainTabs />
    </NavigationContainer>
  );
}
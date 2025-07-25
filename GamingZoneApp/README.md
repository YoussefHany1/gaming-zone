# Gaming Zone Mobile App

A React Native mobile application converted from the Next.js Gaming Zone website. This app provides the latest gaming news, reviews, and hardware information from various RSS feeds.

## Features

- **Home Screen**: Featured news carousel and latest articles
- **News Section**: Latest gaming news from multiple sources
- **Reviews Section**: Game reviews and ratings
- **Hardware Section**: Latest hardware news and reviews
- **Contact Form**: Get in touch with the team
- **Source Selection**: Choose from different RSS feed sources
- **Responsive Design**: Optimized for mobile devices
- **Dark Theme**: Gaming-focused dark theme design

## Prerequisites

Before running this app, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd GamingZoneApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API Base URL:**
   
   Open `src/hooks/useFetchNews.js` and update the `API_BASE_URL` constant to point to your deployed Next.js backend:
   
   ```javascript
   const API_BASE_URL = 'https://your-deployed-nextjs-app.vercel.app'; // Replace with your URL
   ```

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Backend Requirements

This mobile app requires the existing Next.js backend to be running and accessible. Make sure:

1. **Deploy your Next.js app** to a platform like Vercel, Netlify, or Heroku
2. **Update the API URL** in `src/hooks/useFetchNews.js`
3. **Ensure CORS is configured** to allow requests from your mobile app

## Project Structure

```
GamingZoneApp/
├── App.js                          # Main app component with navigation
├── src/
│   ├── components/                 # Reusable components
│   │   ├── ErrorMessage.js         # Error display component
│   │   ├── HeaderCarousel.js       # Featured news carousel
│   │   ├── LoadingSpinner.js       # Loading indicator
│   │   └── NewsItem.js             # News article item component
│   ├── constants/                  # App constants
│   │   ├── rssUrls.js             # RSS feed URLs configuration
│   │   └── theme.js               # App theme and styling constants
│   ├── hooks/                      # Custom React hooks
│   │   └── useFetchNews.js        # News fetching hook
│   └── screens/                    # App screens
│       ├── ArticleDetailScreen.js  # Article detail view
│       ├── ContactScreen.js        # Contact form
│       ├── HardwareScreen.js       # Hardware news
│       ├── HomeScreen.js           # Home screen
│       ├── NewsScreen.js           # News listing
│       └── ReviewsScreen.js        # Reviews listing
├── assets/                         # App assets (icons, images)
└── package.json                    # Dependencies and scripts
```

## Key Components

### Navigation
- **Bottom Tab Navigation**: Main navigation between sections
- **Stack Navigation**: Nested navigation within each section
- **Deep Linking**: Support for article detail navigation

### Data Fetching
- **Custom Hook**: `useFetchNews` for RSS feed data
- **Error Handling**: Comprehensive error states
- **Loading States**: User-friendly loading indicators

### UI Components
- **NewsItem**: Reusable news article component
- **HeaderCarousel**: Featured articles carousel
- **LoadingSpinner**: Consistent loading indicator
- **ErrorMessage**: Error display with retry functionality

## Customization

### Adding New RSS Sources
1. Update `src/constants/rssUrls.js`
2. Add new source objects with required fields:
   ```javascript
   {
     id: unique_id,
     name: "Source Name",
     url: "https://example.com/rss",
     image: "https://example.com/logo.jpg",
     language: "en"
   }
   ```

### Styling
- Modify `src/constants/theme.js` for global theme changes
- Update individual component styles in their respective files
- Colors, fonts, and spacing are centralized in the theme file

### Adding New Screens
1. Create new screen component in `src/screens/`
2. Add navigation route in `App.js`
3. Update tab navigator or stack navigator as needed

## Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build the app:**
   ```bash
   npx expo build:android  # For Android
   npx expo build:ios      # For iOS
   ```

3. **Alternative - EAS Build:**
   ```bash
   npm install -g @expo/eas-cli
   eas build --platform android
   eas build --platform ios
   ```

### Publishing Updates
```bash
npx expo publish
```

## Troubleshooting

### Common Issues

1. **API Connection Issues:**
   - Verify backend URL is correct and accessible
   - Check CORS configuration on backend
   - Ensure RSS feeds are accessible

2. **Navigation Issues:**
   - Clear Metro cache: `npx expo start --clear`
   - Restart development server

3. **Image Loading Issues:**
   - Verify image URLs are accessible
   - Check network connectivity
   - Implement fallback images

### Performance Optimization

1. **Image Optimization:**
   - Use `expo-image` for better performance
   - Implement image caching
   - Optimize image sizes

2. **List Performance:**
   - Implement FlatList for large datasets
   - Use pagination for news items
   - Optimize re-renders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This mobile app maintains the same functionality as the original Next.js website while providing a native mobile experience. Make sure to keep the backend API running and accessible for the mobile app to function properly.
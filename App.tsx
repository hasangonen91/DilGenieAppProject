import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { StatusBar, View } from 'react-native';

import ApplicationNavigator from './src/routes/ApplicationNavigator';

// Initialize query client and storage
const queryClient = new QueryClient();
const storage = new MMKV();

function App() {
  // Define status bar color and style
  const statusBarColor = '#020825'; // Dark blue color

  return (
    <QueryClientProvider client={queryClient}>
      {/* Set status bar properties */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={statusBarColor}
        translucent={false}
      />

      {/* Define a container with background color */}
      <View style={{ flex: 1, backgroundColor: statusBarColor }}>
        <ApplicationNavigator />
      </View>
    </QueryClientProvider>
  );
}

export default App;

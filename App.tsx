import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, View } from 'react-native';

import ApplicationNavigator from './src/routes/ApplicationNavigator';

const queryClient = new QueryClient();

function App() {
  const statusBarColor = '#020825'; 

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={statusBarColor}
        translucent={false}
      />

      <View style={{ flex: 1, backgroundColor: statusBarColor }}>
        <ApplicationNavigator />
      </View>
    </QueryClientProvider>
  );
}

export default App;

import React, {useEffect} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ApplicationNavigator from './src/routes/ApplicationNavigator';
import {setupSpeech} from './src/utils/speech';
import {initGoogleTTS} from './src/services/tts/googleTTS';
import TTSAudioHost from './src/components/ttsHost/TTSAudioHost';

const queryClient = new QueryClient();

function App() {
  const statusBarColor = '#020825';

  useEffect(() => {
    // Cihaz TTS'i kur (fallback) + Google HD ses ayarlarını yükle
    setupSpeech();
    initGoogleTTS();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" />

        <View style={{ flex: 1, backgroundColor: statusBarColor }}>
          <ApplicationNavigator />
          <TTSAudioHost />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

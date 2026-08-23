import React, {useEffect, useState} from 'react';
import {Video, type VideoRef} from 'react-native-video';
import {
  bindAudioHost,
  stopSpeaking,
  type PlayRequest,
} from '../../services/tts/googleTTS';

/**
 * Görünmez ses çalar — Google HD TTS'in ürettiği WAV dosyalarını oynatır.
 * App kökünde bir kez mount edilir; googleTTS modülü ona çalma isteği yollar.
 */
const TTSAudioHost: React.FC = () => {
  const [source, setSource] = useState<PlayRequest | null>(null);
  const [paused, setPaused] = useState(true);
  const [playId, setPlayId] = useState(0);

  useEffect(() => {
    const unbind = bindAudioHost((req: PlayRequest | null) => {
      if (!req) {
        setPaused(true);
        return;
      }
      setSource(req);
      setPaused(false);
      setPlayId(id => id + 1); // aynı dosya tekrar çalınsa diye remount
    });
    return unbind;
  }, []);

  if (!source) {
    return null;
  }

  return (
    <Video
      key={playId}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{width: 0, height: 0}}
      source={source}
      paused={paused}
      volume={1.0}
      ignoreSilentSwitch="ignore"
      mixWithOthers="duck"
      onEnd={() => setPaused(true)}
      onError={() => stopSpeaking()}
    />
  );
};

export default TTSAudioHost;

/* eslint-env jest */
// Native modül mock'ları — test ortamında TurboModule/NitroModule yok

import 'react-native-gesture-handler/jestSetup';

// Firebase native
jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: {
    initializeApp: jest.fn(),
    app: () => ({name: '[DEFAULT]'}),
    apps: [],
  },
  firebase: {SDK_VERSION: '26.0.0'},
}));
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  getAuth: jest.fn(() => ({currentUser: null})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  EmailAuthProvider: {credential: jest.fn()},
  reauthenticateWithCredential: jest.fn(),
}));
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({set: jest.fn(), get: jest.fn()})),
      add: jest.fn(),
    })),
  })),
}));
jest.mock('@react-native-firebase/messaging', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    onMessage: jest.fn(),
  })),
}));

// Nitro tabanlı storage
jest.mock('react-native-mmkv', () => ({
  __esModule: true,
  createMMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
    addOnValueChangedListener: jest.fn(() => ({remove: jest.fn()})),
  })),
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
    addOnValueChangedListener: jest.fn(() => ({remove: jest.fn()})),
  })),
}));

// Video / Skia / Lottie / Bootsplash / FastImage / TTS
jest.mock('react-native-video', () => {
  const {View} = require('react-native');
  const MockVideo = (props) => null;
  MockVideo.defaultProps = props => props;
  return {
    __esModule: true,
    default: MockVideo,
    VideoRef: {},
  };
});
jest.mock('@shopify/react-native-skia', () => ({
  __esModule: true,
  Canvas: () => null,
  Rect: () => null,
  Circle: () => null,
  Group: () => null,
  Skia: {},
  useSharedValue: (v) => ({value: v}),
}));
jest.mock('lottie-react-native', () => 'LottieView');
jest.mock('react-native-bootsplash', () => ({
  __esModule: true,
  default: {
    hide: jest.fn(),
    show: jest.fn(),
    useHideAnimation: jest.fn(() => ({})),
  },
  RNBootSplash: {hide: jest.fn(), show: jest.fn()},
}));
jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const MockFastImage = (props) =>
    React.createElement('FastImage', props, props.children);
  MockFastImage.resizeMode = {contain: 'contain', cover: 'cover'};
  return {__esModule: true, default: MockFastImage};
});
jest.mock('react-native-tts', () => ({
  __esModule: true,
  default: {
    voices: jest.fn(async () => []),
    setDefaultVoice: jest.fn(),
    setDefaultLanguage: jest.fn(),
    setDefaultRate: jest.fn(),
    setDefaultPitch: jest.fn(),
    setIgnoreSilentSwitch: jest.fn(),
    stop: jest.fn(),
    speak: jest.fn(),
  },
}));

// Dosya sistemi (Google TTS cache)
jest.mock('@dr.pogodin/react-native-fs', () => ({
  __esModule: true,
  CachesDirectoryPath: '/tmp/cache',
  DocumentDirectoryPath: '/tmp/docs',
  exists: jest.fn(async () => false),
  mkdir: jest.fn(async () => undefined),
  writeFile: jest.fn(async () => undefined),
  readFile: jest.fn(async () => ''),
  unlink: jest.fn(async () => undefined),
}));

// AsyncStorage (v3'te hazır mock yok — elle)
jest.mock('@react-native-async-storage/async-storage', () => {
  let store = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(async k => store[k] ?? null),
      setItem: jest.fn(async (k, v) => {
        store[k] = String(v);
      }),
      removeItem: jest.fn(async k => {
        delete store[k];
      }),
      clear: jest.fn(async () => {
        store = {};
      }),
      getAllKeys: jest.fn(async () => Object.keys(store)),
      multiRemove: jest.fn(async keys => keys.forEach(k => delete store[k])),
    },
  };
});

// NetInfo native
jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    fetch: jest.fn(async () => ({isConnected: true, type: 'wifi'})),
    addEventListener: jest.fn(() => jest.fn()),
    useNetInfo: jest.fn(() => ({isConnected: true})),
    configure: jest.fn(),
  },
  checkInternetConnection: jest.fn(async () => true),
}));

// Share native
jest.mock('react-native-share', () => ({
  __esModule: true,
  default: {
    open: jest.fn(),
    share: jest.fn(),
    Social: {TWITTER: 'twitter', FACEBOOK: 'facebook', WHATSAPP: 'whatsapp'},
  },
}));

// Email link native
jest.mock('react-native-email-link', () => ({
  __esModule: true,
  openInbox: jest.fn(),
  openComposer: jest.fn(),
}));

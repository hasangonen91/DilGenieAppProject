import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  BottomTab: undefined;
  // BottomTab: {
  //   screen: 'Home';
  //   params: {uid: string; displayName: string | null};
  // };
  Hangman: undefined;
  FlappyBird: undefined;
  WordPuzzle: undefined;
  Quiz: undefined;
  WordMatching: undefined;
  WordCompletion: undefined;
  WordSorting: undefined;
  CrossWordPuzzle: undefined;
  A1level: undefined;
  DragDropQuiz: undefined;
  A2level: undefined;
  B1level: undefined;
  B2level: undefined;
  C1level: undefined;
  C2level: undefined;
};

export type NavigationProp<T extends keyof ApplicationStackParamList> =
  StackNavigationProp<ApplicationStackParamList, T>;
export type RoutePropType<T extends keyof ApplicationStackParamList> =
  RouteProp<ApplicationStackParamList, T>;

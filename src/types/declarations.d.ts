declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.mp4' {
  const content: string;
  export default content;
}

declare module 'react-native-deck-swiper' {
  import {Component} from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  export interface SwiperProps<T> {
    cards?: T[];
    cardIndex?: number;
    renderCard?: (card: T, index: number) => React.ReactNode;
    onSwiped?: (index: number) => void;
    onSwipedAll?: (cards: T[]) => void;
    onSwipedLeft?: (index: number) => void;
    onSwipedRight?: (index: number) => void;
    onSwipedTop?: (index: number) => void;
    onSwipedBottom?: (index: number) => void;
    infinite?: boolean;
    verticalSwipe?: boolean;
    horizontalSwipe?: boolean;
    stackSize?: number;
    stackScale?: number[];
    stackSeparation?: number;
    backgroundColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    cardContainerStyle?: StyleProp<ViewStyle>;
    swipeAnimationDuration?: number;
    showCardVelocity?: boolean;
    overlayLabels?: Record<string, unknown>;
    animateOverlayLabelsOpacity?: boolean;
    animateCardOpacity?: boolean;
    [key: string]: any;
  }

  export default class Swiper<T> extends Component<SwiperProps<T>> {
    swipeLeft: (maybeEarly?: boolean) => void;
    swipeRight: (maybeEarly?: boolean) => void;
    swipeTop: (maybeEarly?: boolean) => void;
    swipeBottom: (maybeEarly?: boolean) => void;
    jumpToCardIndex: (index: number) => void;
  }
}

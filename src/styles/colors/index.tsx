/**
 * @flow
 */
import { Typography, Colors, Assets } from 'react-native-ui-lib';
import { Dimensions, Platform } from 'react-native';

import colors from './colors';

const { width } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 350;

Colors.loadColors(colors);



Assets.loadAssetsGroup('images', {});

Assets.loadAssetsGroup('icons', {});

const scale = (size: number): number => (width / guidelineBaseWidth) * size;

export { colors, scale };

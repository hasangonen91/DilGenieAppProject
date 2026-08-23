/**
 * @flow
 */
import {Dimensions} from 'react-native';

import colors from './colors';

const {width} = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 350;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;

export {colors, scale};

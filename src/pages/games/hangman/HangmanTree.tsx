import React from 'react';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';

const HangmanTree = ({ wrong }) => {
    let rope = wrong > 0 ? <Line x1="250" y1="0" x2="250" y2="120" stroke="#895917" strokeWidth="5" /> : null;
    let head = wrong > 1 ? <Circle cx="250" cy="150" r="30" fill="#ecd2b7" /> : null;
    let bodyMain = wrong > 2 ? <Rect width="10" height="100" x="245" y="150" fill="#ecd2b7" /> : null;
    let hands = wrong > 3 ? (
        <G>
            <Line x1="250" y1="200" x2="220" y2="230" stroke="#ecd2b7" strokeWidth="10" />
            <Line x1="250" y1="200" x2="280" y2="230" stroke="#ecd2b7" strokeWidth="10" />
        </G>
    ) : null;
    let legs = wrong > 4 ? (
        <G>
            <Line x1="250" y1="250" x2="230" y2="300" stroke="#ecd2b7" strokeWidth="10" />
            <Line x1="250" y1="250" x2="270" y2="300" stroke="#ecd2b7" strokeWidth="10" />
        </G>
    ) : null;

    return (
        <Svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" width="200" height="200">
            <Rect fill="#5D3FD3" width="10" height="400" x="20" y="0" />
            <Rect fill="#5D3FD3" width="300" height="10" x="20" y="0" />
            <Rect fill="#5D3FD3" width="300" height="10" x="0" y="400" />
            {rope}
            {head}
            {bodyMain}
            {hands}
            {legs}
        </Svg>
    );
};

export default HangmanTree;


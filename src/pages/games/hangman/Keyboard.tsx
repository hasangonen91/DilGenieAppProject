import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface KeyboardProps {
    onPressKey: (key: string) => void;
    usedLetters: string[];
    resetTrigger: number;
}

const Keyboard: React.FC<KeyboardProps> = ({ onPressKey, usedLetters, resetTrigger }) => {
    const [localUsedLetters, setLocalUsedLetters] = useState<string[]>([]);
    const keysRows = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], [' ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' ']];

    useEffect(() => {
        setLocalUsedLetters(usedLetters);
    }, [usedLetters]);

    useEffect(() => {
        setLocalUsedLetters([]);
    }, [resetTrigger]);

    return (
        <View style={styles.keyboard}>
            {keysRows.map((keys, rowIndex) => (
                <View key={rowIndex} style={styles.keyboardRow}>
                    {keys.map((letter, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.keyItem,
                                localUsedLetters.includes(letter) && styles.usedKey,
                                localUsedLetters.includes(letter) && styles.usedKeyBorder
                            ]}
                            onPress={() => {
                                if (letter !== ' ' && !localUsedLetters.includes(letter)) {
                                    onPressKey(letter);
                                }
                            }}
                        >
                            <Text style={[styles.letter, localUsedLetters.includes(letter) && styles.usedKey]}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default Keyboard;
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'; // Stil dosyanızın yolu

interface TopContainerProps {
    hearts: number;
    correctCount: number;
    incorrectCount: number;
}

const TopContainer: React.FC<TopContainerProps> = ({ hearts, correctCount, incorrectCount }) => {
    const renderHeartIcon = () => {
        return (
            <View style={styles.heartContainer}>
                <Icon name={hearts > 0 ? "flash-sharp" : "flash-outline"} size={24} color="#FFE047" />
                <Text style={styles.heartText}>{hearts}</Text>
            </View>
        );
    };

    return (
        <View style={styles.topContainer}>
            {renderHeartIcon()}
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Doğru: {correctCount}</Text>
                <Text style={styles.scoreText}>Yanlış: {incorrectCount}</Text>
            </View>
        </View>
    );
};

export default TopContainer;

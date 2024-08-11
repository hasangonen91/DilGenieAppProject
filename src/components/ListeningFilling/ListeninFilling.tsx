
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const data = {
    "questions": [
        {
            "sentence": "I am going to the _______ to buy some groceries.",
            "correctAnswer": "market",
            "fullSentence": "I am going to the market to buy some groceries.",
            "translation": "Biraz market alışverişi yapmak için markete gidiyorum."
        },
        {
            "sentence": "She is reading a _______ in the park.",
            "correctAnswer": "book",
            "fullSentence": "She is reading a book in the park.",
            "translation": "O, parkta bir kitap okuyor."
        }
    ]
};

const ListeningFilling: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [showTranslationButton, setShowTranslationButton] = useState<boolean>(false);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [showFullSentence, setShowFullSentence] = useState<boolean>(false);

    useEffect(() => {
        // TTS ayarlarını yap
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
    }, []);

    const playSentence = () => {
        // Kullanıcıya tam cümleyi dinlet
        const sentence = data.questions[currentQuestionIndex].fullSentence;
        Tts.speak(sentence);
    };

    const checkAnswer = () => {
        const correctAnswer = data.questions[currentQuestionIndex].correctAnswer;
        if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setShowFullSentence(true); // Cevap doğruysa tam cümleyi göster
        } else {
            setShowFullSentence(false); // Cevap yanlışsa tam cümleyi gösterme
        }
        setShowTranslationButton(true); // Cevap verildikten sonra çeviri butonunu göster
    };

    const showTranslationText = () => {
        setShowTranslation(true); // Çeviriyi göster
    };

    const nextQuestion = () => {
        setUserInput('');
        setShowTranslationButton(false);
        setShowTranslation(false);
        setShowFullSentence(false);
        if (currentQuestionIndex < data.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Son soru tamamlandı
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={playSentence} style={styles.listenButton}>
                <Icon name="volume-up" size={24} color="#fff" style={styles.icon} />
                <Text style={styles.listenButtonText}>Listen to the Sentence</Text>
            </TouchableOpacity>

            <Text style={styles.questionText}>
                {data.questions[currentQuestionIndex].sentence}
            </Text>

            <TextInput
                style={styles.textInput}
                placeholder="Type the missing word"
                placeholderTextColor="#ffffff"
                value={userInput}
                onChangeText={setUserInput}
            />

            <TouchableOpacity onPress={checkAnswer} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {showFullSentence && (
                <Text style={styles.fullSentenceText}>
                    {data.questions[currentQuestionIndex].fullSentence}
                </Text>
            )}

            {showTranslationButton && (
                <TouchableOpacity onPress={showTranslationText} style={styles.translationButton}>
                    <Text style={styles.translationButtonText}>Show Translation</Text>
                </TouchableOpacity>
            )}

            {showTranslation && (
                <Text style={styles.translationText}>
                    {data.questions[currentQuestionIndex].translation}
                </Text>
            )}

            {showTranslationButton && (
                <TouchableOpacity onPress={nextQuestion} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next Question</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ListeningFilling;
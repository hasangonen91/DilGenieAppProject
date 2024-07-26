import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get('window');

interface FeedbackModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isVisible, onClose }) => {
    const [feedbackText, setFeedbackText] = useState('');

    const handleSubmit = () => {
        // Feedback gönderme işlemleri burada yapılabilir
        console.log('Feedback:', feedbackText);
        onClose(); // Modal'ı kapat
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Support & Feedback</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Write your feedback here"
                    placeholderTextColor={'#fff'}
                    multiline
                    value={feedbackText}
                    onChangeText={text => setFeedbackText(text)}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#020825',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#FFFFFF'
    },
    input: {
        borderColor: '#5D3FD3',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FeedbackModal;

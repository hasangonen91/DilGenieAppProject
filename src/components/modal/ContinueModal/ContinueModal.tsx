import React, { useState } from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, Dimensions } from 'react-native';

interface ContinueModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    content?: string;
}

const { width, height } = Dimensions.get('window');


const ContinueModal: React.FC<ContinueModalProps> = ({ visible, onClose, title, content }) => {

    const [modalTitles, setModalTitles] = useState<string[]>([
        "Ready for the Next Challenge?",
        "Let's Move Forward!",
        "Ready to Learn More?",
        "New Category Awaits!",
        "Next Task is Up!",
        "Excited for the Next Level?",
        "Next Adventure Begins!"
    ]);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleNextTitle = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % modalTitles.length);
    };
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {title && <Text style={styles.modalTitle}>{modalTitles[currentIndex]}</Text>}
                    {content && <Text style={styles.modalTitle}>{title}{'\t'}- {content}</Text>}
                    <TouchableOpacity style={styles.button} onPress={() => { onClose(); handleNextTitle(); }}>
                        <Text style={styles.buttonText}>Let's Go</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ContinueModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.7,
        height: height * 0.25,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00e0ff',
        borderRadius: 20,
        backgroundColor: '#020825',
    },
    modalTitle: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
    },
    button: {
        marginTop: 20,
        width: width * 0.5,
        height: height * 0.06,
        backgroundColor: '#020825',
        borderWidth: 1,
        borderColor: '#00e0ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        elevation: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

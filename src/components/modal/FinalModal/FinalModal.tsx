import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

interface FinalModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

const FinalModal: React.FC<FinalModalProps> = ({ visible, onClose, title, content }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{title}</Text>
                    <Text style={styles.modalText}>{content}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Let's Go!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

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
        width: width * 0.8,
        height: height * 0.3,
        padding: 10,
        borderWidth: 1,
        borderColor: '#5D3FD3',
        borderRadius: 20,
        backgroundColor: '#020825',
    },
    modalText: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18,
        color: '#FFFFFF',
    },
    button: {
        marginTop: 20,
        width: width * 0.6,
        height: height * 0.07,
        backgroundColor: '#020825',
        borderWidth: 1,
        borderColor: '#5D3FD3',
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

export default FinalModal;

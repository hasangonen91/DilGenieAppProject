import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

interface ExitConfirmationModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({ visible, onClose, onConfirm }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Çıkmak istediğinize emin misiniz?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Evet</Text>
                        </TouchableOpacity>
                    </View>
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
        padding: 20,
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
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        height: height * 0.07,
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
    cancelButton: {
        backgroundColor: '#020825',
        borderColor: '#00e0ff',
        borderWidth: 1,
    },
    confirmButton: {
        backgroundColor: '#ff4d4d',
        borderColor: '#ff4d4d',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ExitConfirmationModal;

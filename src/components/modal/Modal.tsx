import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  modalContent: React.ReactNode;
  backgroundColor?: string; // Yeni eklenen prop: arka plan rengi
  modalContentStyle?: object; // Yeni prop
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, closeModal, modalContent, backgroundColor = 'rgba(0, 0, 0, 0.5)', modalContentStyle }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={[styles.modalContainer, { backgroundColor }]} // Arka plan rengini prop ile dinamik olarak değiştir
        activeOpacity={1}
        onPressOut={closeModal}
      >
        <View style={[styles.modalContent, modalContentStyle]}>
          {modalContent}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    height: height * 0.5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#5D3FD3',
    textDecorationLine: 'underline',
  },
});

export default CustomModal;

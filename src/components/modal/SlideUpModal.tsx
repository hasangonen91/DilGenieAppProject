import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

interface SlideUpModalProps {
  isVisible: boolean;
  closeModal: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Tam ekran, aşağıdan yukarıya açılan modal.
 * İçerik, backdrop Touchable'ının DIŞINDA render edilir;
 * böylece içerideki dokunuşlar modalı kapatmaz.
 * Header, status bar'ın altında güvende başlar.
 */
const SlideUpModal: React.FC<SlideUpModalProps> = ({
  isVisible,
  closeModal,
  title,
  subtitle,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent>
      <View style={styles.backdrop}>
        {/* Sadece üstteki boşluk backdrop dokunma alanı */}
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={closeModal}
        />
        <View style={[styles.sheet, {paddingTop: insets.top}]}>
          <View style={styles.handleRow} pointerEvents="none">
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              {title ? (
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              ) : null}
              {subtitle ? (
                <View style={styles.chip}>
                  <Icon name="headset-outline" size={12} color="#00e0ff" />
                  <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={closeModal}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Icon name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* İçerik serbest — dokunuşlar buraya gelir, kapanma tetiklenmez */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default SlideUpModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 37, 0.85)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  sheet: {
    width: width,
    height: height * 0.96,
    backgroundColor: '#020825',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#5D3FD3',
    overflow: 'hidden',
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#00e0ff',
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#00e0ff',
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    marginTop: 6,
    backgroundColor: 'rgba(0, 224, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 224, 255, 0.3)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(93, 63, 211, 0.25)',
    borderWidth: 1,
    borderColor: '#5D3FD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#5D3FD3',
    opacity: 0.5,
    marginHorizontal: 18,
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
});

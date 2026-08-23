import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  /** Üstten (status bar / Dynamic Island) güvenli boşluk — default true */
  safeTop?: boolean;
  /** Alttan (home indicator) güvenli boşluk — default true */
  safeBottom?: boolean;
}

/**
 * Tüm ekranlar için safe-area farkındalıklı sarmalayıcı.
 * İçerik status bar'ın altına kaçmaz, home indicator'a çarpmaz.
 *
 * Kullanım:
 *   <Screen><View>...</View></Screen>
 *   <Screen safeTop={false} backgroundColor="#000">...</Screen>
 */
const Screen: React.FC<ScreenProps> = ({
  children,
  backgroundColor = '#020825',
  style,
  safeTop = true,
  safeBottom = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor},
        safeTop && insets.top > 0 && {paddingTop: insets.top},
        safeBottom && insets.bottom > 0 && {paddingBottom: insets.bottom},
        style,
      ]}>
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

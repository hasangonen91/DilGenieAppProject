import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import BackHeader from '../header/BackHeader';

interface MainComponentProps {
    children: React.ReactNode;
    headerTitle: string;
}

const MainComponent: React.FC<MainComponentProps> = ({ children, headerTitle }) => {
    return (
        <SafeAreaView style={styles.container}>
            <BackHeader title={headerTitle} />
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020825',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
    },
});

export default MainComponent;
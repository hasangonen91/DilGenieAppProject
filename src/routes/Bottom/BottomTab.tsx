import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home, PlayGround, Vocabulary, Profile } from '../../pages/Bottom';
import { ScreenNames } from '../routes.common';

const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window');

// Yükseklik ve genişliğe göre ikon ve diğer stil boyutlarını ayarlayalım
const tabBarHeight = height * 0.07;  // Tab Bar yüksekliği
const iconSize = Math.min(width, height) * 0.08;  // İkon boyutu
const focusedCircleSize = Math.min(width, height) * 0.02;  // Focused ikonu altındaki daire boyutu

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopColor: '#5D3FD3',
        borderTopWidth: 1,
        height: tabBarHeight,
        backgroundColor: '#020825',
    },
    iconContainer: {
        alignItems: 'center',
    },
    focusedCircle: {
        marginTop: 5,
    },
});

function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconComponent;

                    if (route.name === ScreenNames.Home) {
                        iconComponent = focused
                            ? <Icon name="home" size={iconSize} color="#00e0ff" />
                            : <Icon name="home-outline" size={iconSize} color="#5D3FD3" />;
                    } else if (route.name === ScreenNames.Vocabulary) {
                        iconComponent = focused
                            ? <Icon name="bookmark-multiple" size={iconSize} color="#00e0ff" />
                            : <Icon name="bookmark-multiple-outline" size={iconSize} color="#5D3FD3" />;
                    } else if (route.name === ScreenNames.PlayGround) {
                        iconComponent = focused
                            ? <Ionicons name="game-controller" size={iconSize} color="#00e0ff" />
                            : <Ionicons name="game-controller-outline" size={iconSize} color="#5D3FD3" />;
                    } else if (route.name === ScreenNames.Profile) {
                        iconComponent = focused
                            ? <Icon name="account" size={iconSize} color="#00e0ff" />
                            : <Icon name="account-outline" size={iconSize} color="#5D3FD3" />;
                    }

                    return (
                        <View style={styles.iconContainer}>
                            {iconComponent}
                            {focused && <Icon name="circle" size={focusedCircleSize} color="#00e0ff" style={styles.focusedCircle} />}
                        </View>
                    );
                },
                tabBarLabel: () => null,
            })}
        >
            <Tab.Screen name={ScreenNames.Home} component={Home} />
            <Tab.Screen name={ScreenNames.PlayGround} component={PlayGround} />
            <Tab.Screen name={ScreenNames.Vocabulary} component={Vocabulary} />
            <Tab.Screen name={ScreenNames.Profile} component={Profile} />
        </Tab.Navigator>
    );
}

export default BottomTab;

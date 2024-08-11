import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { Splash, Login, Register } from '../pages/Start';
import { Hangman, FlappyBird, WordPuzzle, Quiz, WordMatching, WordCompletion, WordSorting, CrossWordPuzzle } from '../pages/games';
import { A1level, A2level, B1level, B2level, C1level, C2level } from '../pages/Vocabulary';
import DragDropQuiz from '../pages/Vocabulary/A1/DragDropQuiz/DragDropQuiz';
import { ApplicationStackParamList } from '../types/navigation';
import BottomTab from './Bottom/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNames } from './routes.common';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
    const [initialRoute, setInitialRoute] = useState<keyof ApplicationStackParamList>('Splash');

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const userSession = await AsyncStorage.getItem('userSession');
                if (userSession) {
                    setInitialRoute('BottomTab');
                } else {
                    setInitialRoute('Login');
                }
            } catch (error) {
                console.log('AsyncStorage Error:', error);
            }
        };
        checkUserSession();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    ...TransitionPresets.RevealFromBottomAndroid,
                    cardStyle: { backgroundColor: 'white' },
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                        cardStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 0.5, 0.9, 1],
                                outputRange: [0, 0.25, 0.7, 1],
                            }),
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: 'clamp',
                            }),
                        },
                    }),
                }}
            >
                <Stack.Screen name={ScreenNames.Splash} component={Splash} />
                <Stack.Screen name={ScreenNames.Login} component={Login} />
                <Stack.Screen name={ScreenNames.Register} component={Register} />
                <Stack.Screen name={ScreenNames.BottomTab} component={BottomTab} />
                <Stack.Screen name={ScreenNames.Hangman} component={Hangman} />
                <Stack.Screen name={ScreenNames.FlappyBird} component={FlappyBird} />
                <Stack.Screen name={ScreenNames.WordPuzzle} component={WordPuzzle} />
                <Stack.Screen name={ScreenNames.Quiz} component={Quiz} />
                <Stack.Screen name={ScreenNames.WordMatching} component={WordMatching} />
                <Stack.Screen name={ScreenNames.WordCompletion} component={WordCompletion} />
                <Stack.Screen name={ScreenNames.WordSorting} component={WordSorting} />
                <Stack.Screen name={ScreenNames.CrossWordPuzzle} component={CrossWordPuzzle} />
                <Stack.Screen name={ScreenNames.A1level} component={A1level} />
                <Stack.Screen name={ScreenNames.DragDropQuiz} component={DragDropQuiz} />
                <Stack.Screen name={ScreenNames.A2level} component={A2level} />
                <Stack.Screen name={ScreenNames.B1level} component={B1level} />
                <Stack.Screen name={ScreenNames.B2level} component={B2level} />
                <Stack.Screen name={ScreenNames.C1level} component={C1level} />
                <Stack.Screen name={ScreenNames.C2level} component={C2level} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';

// Tema türü
type ThemeType = {
    backgroundColor: string;
    textColor: string;
};

// Tema değerleri
const lightTheme: ThemeType = {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
};

const darkTheme: ThemeType = {
    backgroundColor: '#1E1E1E',
    textColor: '#FFFFFF',
};

// Tema bağlamı oluşturma
type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Tema sağlayıcı bileşeni
type ThemeProviderProps = {
    storage: MMKV;
    children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ storage, children }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    useEffect(() => {
        const savedThemeString = storage.getItem('theme');
        if (savedThemeString) {
            const savedTheme: ThemeType = JSON.parse(savedThemeString);
            setTheme(savedTheme);
        }
    }, []);

    const saveThemeToStorage = (selectedTheme: ThemeType) => {
        const themeString = JSON.stringify(selectedTheme);
        storage.setItem('theme', themeString);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Tema kullanma özelleştirici kancası
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme hook must be used within a ThemeProvider');
    }
    return context;
};

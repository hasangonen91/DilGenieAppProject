import { A1LevelData } from "../../pages/Vocabulary/A1/A1LevelData";
import { A1LevelQuestion } from "../../pages/Vocabulary/A1/A1levelQuestions";


const baseURL = 'https://raw.githubusercontent.com/hasangonen91/dilgenie/main/';

interface Word {
    word: string;
    level: string;
    translation: string;
    example: string;
}

interface Country {
    country_en: string;
    country_tr: string;
    capital_en: string;
    capital_tr: string;
    image_url: string;
}

const fetchData = async (): Promise<Word[]> => {
    try {
        const response = await fetch(baseURL + 'list/wordList/wordlist.json');
        if (!response.ok) {
            throw new Error('Network response was not ok - HTTP Status: ' + response.status);
        }
        const json = await response.json();
        return json.words;
    } catch (error) {
        console.error('Error fetching word data:', error);
        return [];
    }
};

const fetchCountriesData = async (): Promise<Country[]> => {
    try {
        const response = await fetch(baseURL + 'list/countries/countries.json');
        if (!response.ok) {
            throw new Error('Network response was not ok - HTTP Status: ' + response.status);
        }
        const json = await response.json();
        return json.countries;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return [];
    }
};

const getImageURL = (imageName: string): string => {
    return baseURL + imageName;
};

const fetchA1LevelData = async (): Promise<A1LevelData[]> => {
    try {
        const response = await fetch(baseURL + 'vocabulary/A1level.json');
        if (!response.ok) {
            throw new Error('Network response was not ok - HTTP Status: ' + response.status);
        }
        const json = await response.json();
        return json.A1level as A1LevelData[];
    } catch (error) {
        console.error('Error fetching A1 level data:', error);
        return [];
    }
};


const fetchA1LevelQuestions = async (): Promise<A1LevelQuestion[]> => {
    try {
        const response = await fetch(baseURL + 'vocabulary/A1levelQuestions.json');
        if (!response.ok) {
            throw new Error('Network response was not ok - HTTP Status: ' + response.status);
        }
        const json = await response.json();
       // console.log("JSON Data:", JSON.stringify(json));
        return json.A1levelQuestions as A1LevelQuestion[];
    } catch (error) {
        console.error('Error fetching A1 level data:', error);
        return [];
    }
};





export { fetchData, fetchCountriesData, getImageURL, fetchA1LevelData, fetchA1LevelQuestions };

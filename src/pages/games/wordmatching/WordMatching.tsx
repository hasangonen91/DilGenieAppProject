import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

type Country = {
  name: {common: string; official?: string};
  capital?: string[];
  population?: number;
  flags: {svg: string; png?: string};
  cca3: string;
};

const CountriesList = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  const renderItem = ({item}: {item: Country}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name.common}</Text>
      <Text>Capital: {item.capital?.[0]}</Text>
      <Text>Population: {item.population}</Text>
      <Image source={{uri: item.flags.svg}} style={styles.flag} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={item => item.cca3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flag: {
    width: 100,
    height: 60,
    marginTop: 10,
  },
});

export default CountriesList;

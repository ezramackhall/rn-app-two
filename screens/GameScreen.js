import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else {
        return rndNum;
    }
};

const renderListItem =(value, roundNum) => (
    <View key={value} style={styles.listItem}>
        <Text>Round: {roundNum}</Text>
        <Text> Value: {value}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const[currentGuess, setCurrentGuess] = useState(initialGuess);
    const[pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100); 

    const {userChoice, onGameOver} = props;

    useEffect( () => {
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || direction ==='higher' && currentGuess > props.userChoice){
            Alert.alert('Don\'t lie', 'You know that this is wrong....', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        };
        if (direction ==='lower'){
            currentHigh.current = currentGuess;  
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(pastGuesses => [nextNumber , ...pastGuesses]);
    };

    return (
        <View style = {styles.screen}>
            <Text>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style= {styles.buttonContainer}>
                <MainButton onPress = {nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress = {nextGuessHandler.bind(this, 'higher')}>
                 <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    <View>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }, 
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    listItem: {
        borderColor: 'black',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    list: {
        flex: 1,
        width: '80%',
    }
});

export default GameScreen; 
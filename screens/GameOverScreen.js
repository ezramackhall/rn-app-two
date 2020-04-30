import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text> The Game Is Over!</Text>
            <Image 
                source ={require('../assets/splash.png')}
                style = {styles.image}/>
            <Text> Number of rounds: {props.rounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="Restart Game" onPress={props.onRestart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200
    }
});

export default GameOverScreen;
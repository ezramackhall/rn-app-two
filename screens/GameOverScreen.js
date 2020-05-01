import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text> The Game Is Over!</Text>
            <Image 
                source ={{uri: 'https://img.pixers.pics/pho_wat(s3:700/FO/56/87/04/96/700_FO56870496_eecf666f913f9b3344f1d8ff39326e67.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/wall-murals-vector-pixel-message-game-over.jpg.jpg'}}
                style = {styles.image}
                resizeMode='cover'/>
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
        height: 100,
        width: 100,
        margin:50,
    }
});

export default GameOverScreen;
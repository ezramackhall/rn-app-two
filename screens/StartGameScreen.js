import React, {useState} from 'react';
import {
    View, 
    StyleSheet, 
    Text, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHanler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
            Alert.alert(
                'Invalid number!', 
                'Number has to be a number between 1 and 99', 
                [{text: 'OK', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss;
    };

    let confirmedOutput;

    if (confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style = {styles.centreText}>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={()=> props.onStartGame(selectedNumber)}>
                    Start Game!
                </MainButton>
            </Card>
        );
    };

    return(
        <TouchableWithoutFeedback onPress={() =>  {Keyboard.dismiss()}}>
            <View style = {styles.screen}>
                <Text style= {styles.title}>Start a New Game</Text>
                <Card style = {styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        keyboardType='number-pad' 
                        maxLength= {2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                title="Reset" 
                                onPress={resetInputHandler} 
                                color={Colors.primary}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Confirm" 
                                onPress={confirmInputHanler} 
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 1,
        alignItems: 'center',
    },
    button:{
        width: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        fontFamily: 'open-sans'
    }, 
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }, 
    centreText: {
        textAlign: "center",
    },
});

export default StartGameScreen;
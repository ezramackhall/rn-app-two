import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (
    <View style={{...style.card, ...props.style}}>{props.children}</View>
    );
};

const style = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 10,
        padding: 20,
        borderRadius: 10
    }
});

export default Card;
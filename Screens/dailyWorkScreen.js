import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, Button } from "react-native";

import colors from "../config/colors";
import { TextInput } from "react-native-gesture-handler";


function DailyWork() {
    const [value, onChangeText] = React.useState('Type your work here');
    const [titleText, onChangeTitle] = React.useState("12-12-2020");
    const [currentDate, setCurrentDate] = React.useState('');
    React.useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(date + '/' + month + '/' + year);
    }, []);
    return (
        <View style={styles.screen}>
            <Text>
                {currentDate}
            </Text>
            <TextInput
                style={{ height: 60, borderColor: 'gray', borderWidth: 2 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button title="Save" style={styles.button}></Button>
            <Button title="Set reminder" style={styles.button}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 90,
        backgroundColor: colors.light,
    },
    button: {
        padding: 90,
    }
})

export default DailyWork;


import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

export default function NewNote() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const changeTitle = (val) => {
        setTitle(val);
    };
    const changeBody = (val) => {
        setBody(val);
    };
    return (
        <View>
            <View style={styles.body}>
                <TextInput
                    placeholder="Title of the note"
                    style={styles.titleNote}
                    onChangeText={changeTitle}
                />
                <TextInput
                    multiline
                    placeholder="Your note goes here"
                    style={styles.bodyNote}
                    onChangeText={changeBody}
                />
            </View>
            <Button title="Save" onPress={() => console.log(title, body)} />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'skyblue',
        borderWidth: 1,
        padding: 8,
    },
    titleNote: {
        margin: 2,
        borderBottomWidth: 1,
        padding: 5,
    },
    bodyNote: {
        margin: 2,
        padding: 5,
        height: 450,
    },
});

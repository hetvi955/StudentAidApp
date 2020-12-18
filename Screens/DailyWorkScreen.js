import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';

import db from '../sqlite/database'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
    { key: 1, title: 'Note 1', body: 'Hello everyone, how are you' },
    { key: 2, title: 'Note 2', body: 'Hope everyone are good' },
    { key: 3, title: 'Note 3', body: 'You knwo what, I am great' },
    { key: 4, title: 'Note 4', body: 'Ammuku dummuku ammal dummal' },
    { key: 5, title: 'Note 5', body: 'Ey yo! I have become an android developer now' },
    { key: 6, title: 'Note 6', body: 'Come on man, you got this!' },
    { key: 7, title: 'Note 7', body: 'Bla bla bla bla bla bla bla bla bla' },
];

export default function DailyWork(props) {
    const [notes, setNotes] = useState(data);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
            )
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title="Add work" onPress={() => {
                    props.navigation.navigate('NewNote')
                }} />
            </View>
            <View style={styles.list}>
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.key}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Note', item) }}>
                            <Text style={styles.item}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    button: {
        marginTop: 2
    },
    footer: {
        position: 'absolute',
        height: 50,
        left: 0,
        top: windowHeight - 40,
        width: windowWidth,
    },
    add: {
        textAlign: 'center',
        fontSize: 40,
        color: 'blue',
    },
    list: {
        flex: 1,
        alignItems: "center"
    },
    item: {
        width: 150,
        height: 100,
        marginTop: 30,
        padding: 10,
        backgroundColor: 'pink',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5
    }
});

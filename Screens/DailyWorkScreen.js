import React, { useState } from 'react';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
    { key: 1, title: 'Note 1', body: 'Body of Note 1' },
    { key: 2, title: 'Note 2', body: 'Body of Note 2' },
    { key: 3, title: 'Note 3', body: 'Body of Note 3' },
    { key: 4, title: 'Note 4', body: 'Body of Note 4' },
    { key: 5, title: 'Note 5', body: 'Body of Note 5' },
    { key: 6, title: 'Note 6', body: 'Body of Note 6' },
    { key: 7, title: 'Note 7', body: 'Body of Note 7' },
];

export default function DailyWork(props) {
    const [notes, setNotes] = useState(data);
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
                        <TouchableOpacity>
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

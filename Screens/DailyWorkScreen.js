import React, { useState, useEffect, useRef } from 'react';
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
import * as Notifications from 'expo-notifications';
import { MaterialIcons } from '@expo/vector-icons';

import db from '../sqlite/database'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
    { key: 1, title: 'Note 1', body: 'Hello everyone, how are you', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 2, title: 'Note 2', body: 'Hope everyone are good', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 3, title: 'Note 3', body: 'You knwo what, I am great', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 4, title: 'Note 4', body: 'Ammuku dummuku ammal dummal', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 5, title: 'Note 5', body: 'Ey yo! I have become an android developer now', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 6, title: 'Note 6', body: 'Come on man, you got this!', alarm: '2020-12-20T09:33:00.000Z' },
    { key: 7, title: 'Note 7', body: 'Bla bla bla bla bla bla bla bla bla', alarm: '2020-12-20T09:33:00.000Z' },
];
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

//function for scheduling notifications
async function schedulePushNotification(title, body) {
    const trigger = new Date('2020-12-20T09:40:00.000Z');
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: { data: 'goes here' },
        },
        trigger
    });
}
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default function DailyWork(props) {
    const [notes, setNotes] = useState([]);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(() => {
        /* to do
         Get all the NoteDetails of the user in db and assign it to 'notes' using the setNotes method-
         get route for fetching data
        */
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM notes', null,
                (txObject, result) => {
                    //console.log('our notes are', result.rows['_array'])
                    setNotes(result.rows['_array'])
                },
                (txObject, err) => console.log('error occurred', err)
            )
        }, notes)
        /*
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });


        //scheduling alarms for notes(doubt) - no proper example were given in docs

        for (let i = 0; i < notes.length; i++) {
            schedulePushNotification(notes[i].title, notes[i].body)
        }

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };*/
    })

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title=" + Add work" onPress={() => {
                    props.navigation.navigate('NewNote')
                }} />
            </View>
            <View style={styles.list}>
                <FlatList
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={notes}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Note', item) }}>
                            <Text style={styles.item}>{item.title}</Text>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('Schedule', {
                                    id: item.id,
                                    title: item.title,
                                    alarm: item.alarm
                                })
                            }}>
                                <MaterialIcons name="notifications" />
                            </TouchableOpacity>

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
        marginTop: 0.01*windowHeight,
        marginLeft: 0.15*windowWidth,
        width: 0.7*windowWidth,
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
        width: 120,
        height: 100,
        marginTop: 30,
        padding: 30,
        backgroundColor: 'pink',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 15
    }
});

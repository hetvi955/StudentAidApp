<<<<<<< HEAD
import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
//import CommunityPicker from "../components/CommunityPicker"
import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
} from "../components/forms"
import Screen from "../components/Screen";
//import AppSwitch from "../components/Switch";
import colors from "../config/colors";

//import random from "../config/RandomColors";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    body: Yup.string().label("Body"),
});

export default function NewNote(props) {

    return (
        <ScrollView style={styles.container}>
            <Screen>
                <Form
                    initialValues={{
                        title: "",
                        body: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        props.navigation.goBack();
                    }}
                    validationSchema={validationSchema}
                >
                    <FormField maxLength={255} name="title" placeholder="Title of your note" />
                    <FormField
                        maxLength={255}
                        multiline
                        name="body"
                        numberOfLines={15}
                        placeholder="Your note goes here"
                    />

                    <SubmitButton title="Save" />
                </Form>
            </Screen>
        </ScrollView>

=======
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
>>>>>>> 213ac65... basic structure of daily work feature
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: colors.light,
    },
});

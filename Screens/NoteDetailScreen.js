import React, { useEffect } from 'react';

import { Text, View, Button, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
} from "../components/forms"
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    body: Yup.string().label("Body"),
});


const NoteDetail = (props) => {
    return (
        <ScrollView style={styles.container}>
            <Screen>
                <Form
                    initialValues={{
                        title: props.route.params.title,
                        body: props.route.params.body,
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        props.navigation.goBack();
                    }}
                    validationSchema={validationSchema}
                >
                    <FormField maxLength={255} name="title" />
                    <FormField
                        maxLength={255}
                        multiline
                        name="body"
                        numberOfLines={15}
                    />

                    <SubmitButton title="Save" />
                </Form>
            </Screen>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: colors.light,
    },
});

export default NoteDetail;
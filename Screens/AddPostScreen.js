import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    FormImagePicker
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  tags: Yup.array().label("Tags"),
});


function AddPostScreen() {

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          image: null,
          description: "",
          tags: [],
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="image" style={styles.image} />  
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AddPostScreen;

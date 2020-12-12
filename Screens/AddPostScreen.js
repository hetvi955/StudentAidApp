import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";

import {
    AppForm as Form,
    AppFormField as FormField,
    FormPicker as Picker,
    SubmitButton,
    FormImagePicker
} from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

import random from "../config/RandomColors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  tags: Yup.string().label("Tags"),
});


const categories = [
  {
    backgroundColor: random(),
    icon: "account-group",
    label: "Community1",
    value: 1,
  },
  {
    backgroundColor: random(),
    icon: "account-group",
    label: "Community2",
    value: 2,
  },
  {
    backgroundColor: random(),
    icon: "account-group",
    label: "Community3",
    value: 3,
  },
  {
    backgroundColor: random(),
    icon: "account-group",
    label: "Community4",
    value: 4,
  },
  {
    backgroundColor: random(),
    icon: "account-group",
    label: "Community5",
    value: 5,
  },
];

function AddPostScreen() {

  return (
    <ScrollView style={styles.container}>
      <Screen>
        <Form
          initialValues={{
            title: "",
            image: null,
            description: "",
            tags: "",
            category: null,
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
          <Picker
            items={categories}
            name="category"
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <FormField
            maxLength={255}
            name="tags"
            placeholder="#tag"
          />
          <SubmitButton title="Post" />
        </Form>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.light,
  },
});
export default AddPostScreen;

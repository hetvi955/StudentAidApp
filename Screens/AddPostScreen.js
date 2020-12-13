
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import CommunityPicker from "../components/CommunityPicker";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    FormImagePicker
} from "../components/forms";
import Screen from "../components/Screen";
import AppSwitch from "../components/Switch";
import colors from "../config/colors";

import random from "../config/RandomColors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  tags: Yup.string().required().label("Tags"),
  communities: Yup.array().required().label("Communities"),
  image: Yup.object().required().nullable().label("Image"),
  public: Yup.boolean().label("Public"),
});


const communities = [
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
            communities: [],
            public: false,
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
          <FormField
            maxLength={255}
            name="tags"
            placeholder="#tag"
          />
          <View style={styles.picker}>
            <CommunityPicker
              items={communities}
              name="communities"
              placeholder="Community"
              width='50%'
            />
            <AppSwitch name="public" />
          </View>
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
  picker: {
    flex: 1,
    flexDirection: 'row'
  }
});
export default AddPostScreen;

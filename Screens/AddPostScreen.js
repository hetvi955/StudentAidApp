
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import PostApi from "../api/posts";
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
import makeHashtagArray from "../config/makeHashtags";

import random from "../config/RandomColors";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  tags: Yup.string().required().label("Tags"),
  communities: Yup.array().label("Communities"),
  image: Yup.string().required().label("Image"),
  public: Yup.boolean().label("Public"),
  anonymous: Yup.boolean().label("Anonymous"),
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

function AddPostScreen({ route }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (post, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await PostApi.createPost(
      { ...post, tags : makeHashtagArray(post.tags) },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      console.log(result.data);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <ScrollView style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Screen>
        <Form
          initialValues={{
            title: "",
            description: "",
            tags: "",
            communities: [],
            public: false,
            anonymous: false,
            image: "",
          }}
          onSubmit={handleSubmit}
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
          <CommunityPicker
            items={communities}
            name="communities"
            placeholder="Community"
            width='50%'
          />
          <View style={styles.picker}>
            <AppSwitch name="anonymous" title="Anonymous User" />
            <AppSwitch name="public" title="Public Post" />
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
    flexDirection: 'row',
    marginBottom: 30,
  }
});
export default AddPostScreen;

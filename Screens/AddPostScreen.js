
import React, { useEffect, useState } from "react";
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

import UploadScreen from "./UploadScreen";
import communityApi from "../api/community";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
  tags: Yup.string().required().label("Tags"),
  communities: Yup.array().label("Communities"),
  image: Yup.string().required().label("Image"),
  public: Yup.boolean().label("Public"),
});


function AddPostScreen() {
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
            image: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.imageContainer}>
            <FormImagePicker name="image" />  
          </View>
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <FormField
            maxLength={255}
            multiline
            name="tags"
            placeholder="#tag"
          />
          <CommunityPicker
            name="communities"
            placeholder="Community"
            width='50%'
          />
          <View style={styles.picker} >
            <AppSwitch name="public" title="Public Post" />
          </View>
          <View style={styles.buttonContainer}>
            <SubmitButton title="Add Post" />
          </View>
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
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 35,
  }
});
export default AddPostScreen;

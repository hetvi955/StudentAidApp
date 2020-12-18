import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from "yup";


import { AppForm as Form, AppFormField as FormField, SubmitButton, ErrorMessage } from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import community from "../api/community";


const validationSchema = Yup.object().shape({
  communityName: Yup.string().required().min(1).label("Community Name"),
});

export default function CreateCommunity({ navigation }) {
  const createCommunityApi = useApi(community.create);
  const [error, setError] = useState();

  const handleSubmit = async({ communityName }, { resetForm }) => {
    const result = await createCommunityApi.request(communityName);
    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }else {
      console.log(result.data);
      resetForm();
      setError();
      navigation.navigate("CommunityPage", { id : result.data, isAdmin: true, communityName: communityName });
    }
  }

  return (
    <View style={styles.container}>
      <Form
        initialValues={{
          communityName: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} /> 
        <FormField maxLength={255} name="communityName" placeholder="Community Name" autoCapitalize="none" />
        <SubmitButton title="Create" style={styles.button} />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
});
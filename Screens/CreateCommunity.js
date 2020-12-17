import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Yup from "yup";
import { useFormikContext } from 'formik';

import { AppForm as Form, AppFormField as FormField, SubmitButton, ErrorMessage } from '../components/forms';
import Screen from '../components/Screen';
import colors from '../config/colors';
import RandomID from '../config/RandomID';
import useApi from '../hooks/useApi';
import community from "../api/community";


const validationSchema = Yup.object().shape({
  communityName: Yup.string().required().min(1).label("Community Name"),
});

export default function CreateCommunity() {
  const createCommunityApi = useApi(community.create);
  const [error, setError] = useState();

  const handleSubmit = async({ communityName }) => {
    const result = await createCommunityApi.request(communityName);
    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    console.log(result.data);
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
        <FormField maxLength={255} name="communityName" placeholder="Community Name" />
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
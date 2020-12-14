import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Yup from "yup";
import { useFormikContext } from 'formik';

import { AppForm as Form, AppFormField as FormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import colors from '../config/colors';
import RandomID from '../config/RandomID';


const validationSchema = Yup.object().shape({
  communityName: Yup.string().required().min(1).label("Community Name"),
});

export default function CreateCommunity() {
  return (
    <Screen>
      <View style={styles.container}>
        <Form
          initialValues={{
            communityName: "",
            communityID: ""
          }}
          onSubmit={(values) => {
            const ID = RandomID(6);
            values.communityID = ID;
            Alert.alert("Community ID", `${ID}`, [
              { text: "Close" },
            ])
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          <FormField maxLength={255} name="communityName" placeholder="Community Name" />
          <SubmitButton title="Create" style={styles.button} />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.light,
  },
  button: {

  }
});
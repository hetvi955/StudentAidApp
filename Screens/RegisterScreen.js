import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import { Button } from 'material-bread';

import Screen from "../components/Screen";
import { AppForm as Form, AppFormField as FormField, SubmitButton, ErrorMessage } from "../components/forms";
import colors from "../config/colors";
import authApi from "../api/auth";
import useAuth from "../Auth/useAuth";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ navigation }) {
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({name, email, password}) => {
    const result = await registerApi.request({
      Name: name, Email: email, Password: password
    });
    if (!result.ok) {
      if (result.data) setError(result.data.message);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    const { data : { token: authToken } } = await loginApi.request(
      email,
      password
    );
    auth.logIn(authToken);
  };

  return (
    <>
    <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <ErrorMessage error={error} visible={error} />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <View style={styles.link}>
          <AppText style={styles.text}>already have account?</AppText>
          <Button text={'Login'} type="text" textColor={colors.primary} onPress={() => navigation.navigate("Login")}/>
        </View>
        <SubmitButton title="Register" />
      </Form>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background
  },
  background: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
  }
});

export default RegisterScreen;

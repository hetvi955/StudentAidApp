import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import { Button } from 'material-bread';

import Screen from "../components/Screen";
import { AppForm as Form, AppFormField as FormField, SubmitButton, ErrorMessage } from "../components/forms";
import colors from "../config/colors";
import authApi from '../api/auth';
import useAuth from "../Auth/useAuth";
import AppText from "../components/AppText";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) {
      setErrorMsg(result.data.message);
      return setLoginFailed(true);
    };
    setLoginFailed(false);
    auth.logIn(result.data.token);
  };

  return (
    <>
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <ErrorMessage error={errorMsg ? errorMsg : "Invalid credentials"} visible={loginFailed} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
          <AppText style={styles.text}>not an user?</AppText>
          <Button text={'Register'} type="text" textColor={colors.primary} onPress={() => navigation.navigate("Register")}/>
        </View>
        <SubmitButton title="Login" />
      </Form>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
  }
});

export default LoginScreen;

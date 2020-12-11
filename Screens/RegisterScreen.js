import React from "react";
import { StyleSheet, ImageBackground, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm as Form, AppFormField as FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <Image style={styles.logo} source={require("../assets/logo.png")} />
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
        <SubmitButton title="Register" />
      </Form>
    </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
});

export default RegisterScreen;

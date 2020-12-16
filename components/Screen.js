import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ScrollView style={[styles.view, style]}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;

import React from "react";
import { StyleSheet, View, Alert } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import AppText from "../components/AppText";


function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Gokul"
          subTitle="gokul@gmail.com"
          image={require("../assets/student.jpg")}
        />
      </View>
      <ListItem
        title="Create Community"
        IconComponent={<Icon name="account-multiple-plus-outline" backgroundColor={colors.medium} />}
        onPress={() => navigation.navigate("CreateCommunity")}
      />
      <ListItemSeparator />
      <ListItem
        title="Join Community"
        IconComponent={<Icon name="account-arrow-right-outline" backgroundColor={colors.medium} />}
        onPress={() => Alert.alert("Join", "Are you sure you want to join this community?", [
          { text: "Join", onPress: () => {
            console.log("join")
          } },
          { text: "Cancel" },
        ])}
      />
      <AppText style={styles.header}>Communities</AppText>
      <ListItem
        title="Community1"
        IconComponent={<Icon name="account-group-outline" backgroundColor={colors.medium} />}
      />
      <ListItemSeparator />
      <ListItem
        title="Community2"
        subTitle="(Admin)"
        IconComponent={<Icon name="account-group-outline" backgroundColor={colors.medium} />}
      />
      <AppText></AppText>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ed4618" />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
  header: {
    color: colors.medium,
    marginLeft: 20,
    marginVertical: 5,
  }
});

export default AccountScreen;

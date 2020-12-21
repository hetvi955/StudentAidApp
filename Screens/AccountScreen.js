import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useAuth from '../Auth/useAuth';
import RandomColor from "../config/RandomColors";
import useApi from "../hooks/useApi";
import community from "../api/community";
import { FlatList } from "react-native-gesture-handler";
import AppModal from "../components/AppModal";


function AccountScreen({ navigation }) {
  const [refreshing, setRefreshing]  = useState(false);
  const [Communities, setCommunities] = useState([]);
  const [join, setJoin] = useState(false);
  const { user, logOut } = useAuth();

  const getCommunity = async() => {
    const result = await community.getCommunities();
    if(!result.ok){
      console.log(result.problem, result.originalError);
      return;
    }
    setCommunities(result.data.data);
  }

  useEffect(() => {
    getCommunity();
  }, [])
  

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          IconComponent={<Icon name="account" iconColor={colors.dark} backgroundColor={colors.light} size={60} />}
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
        onPress={() => setJoin(true)}
      />
      {join && <AppModal visible={true} setVisible={setJoin} />}
      <View style={styles.communityContainer}>
        <AppText style={styles.header}>Communities</AppText>
        <MaterialCommunityIcons name="refresh" size={24} color="black" onPress={() => { getCommunity(); }} />
      </View>
      
      {Communities && <FlatList
        data={Communities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <ListItem
              title={item.communityName}
              subTitle={item.isAdmin ? "(Admin)" : "(Member)"}
              IconComponent={<Icon name="account-group-outline" backgroundColor={colors.medium} />}
              onPress={() => navigation.navigate("CommunityPage", item)}
            />
            <ListItemSeparator />
          </>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          getCommunity();
        }}
      />}
      <View style={styles.logout}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ed4618" />}
          onPress={() => logOut()}
        />
      </View>
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
  },
  logout: {
    marginTop: 20,
    marginBottom: 40,
  },
  communityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  }
});

export default AccountScreen;


// Alert.alert("Join", "Are you sure you want to join this community?", [
//   { text: "Join", onPress: () => {
//     console.log("join")
//   } },
//   { text: "Cancel" },
// ])
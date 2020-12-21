import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, SafeAreaView, ScrollView, VirtualizedList } from "react-native";
import { Chip, Icon, Button } from 'material-bread';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Clipboard from 'expo-clipboard';

import colors from "../config/colors";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import CommunityApi from "../api/community";
import Card from "../components/Card";
import Screen from '../components/Screen';
import routes from "../navigation/routes";

function CommunityPage({ navigation }) {
    const [posts, setPosts]  = useState([]);
    const [refreshing, setRefreshing]  = useState(false);

    const route = useRoute();

    const getCommunityPost = async() => {
        const result = await CommunityApi.getCommunityDetails(route.params.id);
        if(!result.ok){
            console.log(result.problem, result.originalError);
            return;
        }
        setPosts(result.data.data.posts);
    }

    useEffect(() => {
        getCommunityPost();
    }, [])

    const getItem = (data, index) => {
        return data[index];
    }
      

    const getItemCount = (data) => {
        return data.length;
    }

    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
            <Image style={styles.image} source={require("../assets/community.png")} />
            <View style={styles.button}>
                <Button text={route.params.isAdmin ? "Admin" : "Member"} type="flat" color={colors.secondary} />
            </View>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{route.params.communityName || "Community"}</AppText>
                <Chip text={route.params.id} style={styles.tag}
                    rightIcon={<Icon 
                        name="content-copy" 
                        color={colors.medium} 
                        iconComponent={MaterialCommunityIcons} 
                        onPress={() => Clipboard.setString(route.params.id)}
                    />}
                />
            </View>
            {posts && <VirtualizedList
            data={posts}
            initialNumToRender={0}
            keyExtractor={(post) => post._id}
            renderItem={({ item }) => (
                <>
                <Card
                    title={item.title}
                    tags={item.tags}
                    description={item.description}
                    image={item.image}
                    key={item._id}
                    onPress={() => navigation.navigate(routes.POST_DETAILS, item)}
                />
                </>
            )}
            getItemCount={getItemCount}
            getItem={getItem}
            refreshing={refreshing}
            onRefresh={() => {
                getCommunityPost();
            }}
            />
            }
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        marginVertical: 10,
    },
    tag: {
        marginHorizontal: 5,
        marginBottom: 5,
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight : 20,
        marginTop : 10,
    },
    screen: {
        flex: 1,
    },
});

export default CommunityPage;

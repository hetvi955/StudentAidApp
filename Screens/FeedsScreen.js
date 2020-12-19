import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import postsApi from '../api/posts';
import AppText from "../components/AppText";


function FeedsScreen({ navigation }) {
    const [posts, setPosts]  = useState([]);
    const [refreshing, setRefreshing]  = useState(false);

    const getPosts = async() => {
        const result = await postsApi.getPublicPosts();
        if(!result.ok){
            console.log(result.problem, result.originalError);
            return;
        }
        setPosts(result.data.data);
    }

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <View style={styles.screen}>
            {posts && <FlatList
            data={posts}
            keyExtractor={(post) => post._id}
            renderItem={({ item }) => (
                <>
                <Card
                    title={item.title}
                    tags={item.tags}
                    description={item.description}
                    image={item.image}
                    onPress={() => navigation.navigate(routes.POST_DETAILS, item)}
                />
                </>
            )}
            refreshing={refreshing}
            onRefresh={() => {
                getPosts();
            }}
            />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.light,
        flex: 1,
    },
})

export default FeedsScreen;


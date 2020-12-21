import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import postsApi from '../api/posts';
import AppText from "../components/AppText";
import CommunityApi from "../api/community";
import useAuth from "../Auth/useAuth";


function FeedsScreen({ navigation }) {
    const [posts, setPosts]  = useState([]);
    const [refreshing, setRefreshing]  = useState(false);
    const { user } = useAuth();


    const getPublicPost = async() => {
        const result = await postsApi.getPublicPosts();
        if(!result.ok){
            console.log(result.problem, result.originalError);
            return;
        }
        setPosts(result.data.data);
    }

    useEffect(() => {
        getPublicPost();
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
                    key={item._id}
                    liked={item.isLiked}
                    id={item._id}
                    likeCount={item.voters.length}
                    deleteButton={item.creator.id === user.id}
                />
                </>
            )}
            refreshing={refreshing}
            onRefresh={() => {
                getPublicPost();
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


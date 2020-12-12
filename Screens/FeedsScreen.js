import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";

const feedPosts = [
    {
        id: 1,
        title: "College",
        description: `An educational institution or establishment, in particular one providing higher education or specialized professional or vocational training`,
        tags: [ 'college', 'students', 'placement' ],
        image: require("../assets/college.jpg")
    },
    {
        id: 2,
        title: "Graduation",
        description: `Graduation is the award of a diploma or academic degree, or the ceremony that is sometimes associated with it, in which students become graduates.`,
        tags: [ 'college', 'students', 'graduation', '2020' ],
        image: require("../assets/graduation.jpg")
    }
]

const refreshPosts = [
    {
        id: 1,
        title: "Graduation",
        description: `Graduation is the award of a diploma or academic degree, or the ceremony that is sometimes associated with it, in which students become graduates.`,
        tags: [ 'college', 'students', 'graduation', '2020' ],
        image: require("../assets/graduation.jpg")
    }
]

function FeedsScreen({ navigation }) {
    const [posts, setPosts]  = useState(feedPosts);
    const [refreshing, setRefreshing]  = useState(false);
    return (
        <View style={styles.screen}>
            <FlatList
            data={posts}
            keyExtractor={(post) => post.id.toString()}
            renderItem={({ item }) => (
                <Card
                    title={item.title}
                    tags={item.tags}
                    description={item.description}
                    image={item.image}
                    onPress={() => navigation.navigate(routes.POST_DETAILS, item)}
                />
            )}
            refreshing={refreshing}
            onRefresh={() => {
                setPosts(refreshPosts)
                setRefreshing(refreshing)
            }}
            />
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


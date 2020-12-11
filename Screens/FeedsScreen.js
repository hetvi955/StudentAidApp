import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";

const feedPosts = [
    {
        id: 1,
        title: "College",
        description: `An educational institution or establishment, in particular one providing 
        higher education or specialized professional or vocational training`,
        tags: [ 'college', 'students', 'placement' ],
        image: require("../assets/college.jpg")
    },
    {
        id: 2,
        title: "Graduation",
        description: `Graduation is the award of a diploma or academic degree, or the ceremony 
        that is sometimes associated with it, in which students become graduates.`,
        tags: [ 'college', 'students', 'graduation', '2020' ],
        image: require("../assets/graduation.jpg")
    }
]

function FeedsScreen(props) {
    return (
        <Screen style={styles.screen}>
            <FlatList
            data={feedPosts}
            keyExtractor={(post) => post.id.toString()}
            renderItem={({ item }) => (
                <Card
                    title={item.title}
                    tags={item.tags}
                    description={item.description}
                    image={item.image}
                    onPress={() => console.log(item)}
                />
            )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
})

export default FeedsScreen;


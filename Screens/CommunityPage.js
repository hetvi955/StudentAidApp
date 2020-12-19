import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Chip, Icon, Button } from 'material-bread';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Clipboard from 'expo-clipboard';

import colors from "../config/colors";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import CommunityApi from "../api/community";

function CommunityPage() {

    const route = useRoute();

    return (
        <View>
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
        </View>
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
    }
});

export default CommunityPage;

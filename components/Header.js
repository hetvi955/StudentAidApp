import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'blue'
    },
    title: {
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
export default Header;
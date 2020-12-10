import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function AccountScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Account</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})

export default AccountScreen;
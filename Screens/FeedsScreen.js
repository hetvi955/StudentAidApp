import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function FeedsScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Feeds</Text>
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

export default FeedsScreen;
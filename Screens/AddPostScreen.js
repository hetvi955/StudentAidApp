import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function AddPostScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Add your Post here!</Text>
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

export default AddPostScreen;
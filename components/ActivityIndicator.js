import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


export default function AppActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay} >
      <Image source={require("../assets/animations/loader.gif")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: "white",
        height: "100%",
        opacity: 0.8,
        width: "100%",
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
    }
});

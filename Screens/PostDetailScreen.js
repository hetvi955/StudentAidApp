import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Chip } from 'material-bread';

import colors from "../config/colors";
import AppText from "../components/AppText";

function PostDetailScreen({ route }) {
  const feeds = route.params;

  return (
    <View>
      <Image style={styles.image} source={{ uri: `data:image/png;base64,${feeds.image}`}} resizeMode='stretch' backgroundColor={colors.dark} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{feeds.title}</AppText>
        <AppText style={styles.description}>{feeds.description}</AppText>
      </View>
      <View style={styles.tagsConatiner}>
        {feeds.tags && feeds.tags.map((tag, i) => 
            <Chip text={tag} style={styles.tag} key={i} />
        )}
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
  description: {
    color: colors.medium,
    textAlign: 'auto'
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  tagsConatiner: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: "wrap"
  },
  tag: {
    marginHorizontal: 5,
    marginBottom: 5
  }
});

export default PostDetailScreen;

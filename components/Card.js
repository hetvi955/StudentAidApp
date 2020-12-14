import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Chip } from 'material-bread';

import AppText from "./AppText";
import colors from "../config/colors";
import ListItemSeparator from "./ListItemSeparator";

function Card({ title, tags, image, onPress, description }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.description} numberOfLines={2}>
            {description}
          </AppText>
          <View style={styles.tagsConatiner}>
            {tags && tags.map((tag, i) => 
              <Chip text={tag} style={styles.tag} key={i} />
            )}
          </View>
        </View>
        <ListItemSeparator />
        <View style={styles.icons}>
          <MaterialCommunityIcons name="heart-outline" color={colors.secondary} size={30} />
          <MaterialCommunityIcons name="comment" color={colors.primary} size={30} />
          <MaterialCommunityIcons name="share" color={colors.dark} size={30} />
        </View>
      </View>
    </TouchableWithoutFeedback>  
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 15,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  description: {
    color: colors.medium,
    textAlign: 'auto'
  },
  title: {
    marginBottom: 7,
    fontWeight: "bold",
  },
  tagsConatiner: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: "wrap"
  },
  tag: {
    marginHorizontal: 5,
    marginBottom: 5
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  }
});

export default Card;

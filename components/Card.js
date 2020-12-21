import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { Chip, Fab, ToggleButton } from 'material-bread';

import AppText from "./AppText";
import colors from "../config/colors";
import postApi from "../api/posts";

const imageHeight = 200;
const iconSize = 32;

function Card({ title, tags, image, onPress, description, liked, id, likeCount, deleteButton }) {
  const [like, setLike] = useState(liked);
  const [count, setCount] = useState(likeCount);
  const likePost = async(id) => {
      const result = await postApi.likePost(id);
      if(!result.ok){
          console.log(result.problem, result.originalError);
          return;
      }
      setLike(result.data.liked);
      setCount(prev => result.data.liked ? prev + 1 : prev - 1 );
  }

  const deletePosts = async(id) => {
    const result = await postApi.deletePost(id);
    if(!result.ok){
      console.log(result.problem, result.originalError);
      return;
    }

  }

  useEffect(() => {
    setLike(liked);
  }, []);

  return (
      <View style={styles.card}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <Image style={styles.image} source={{ uri: `data:image/png;base64,${image}`}} resizeMode='cover' backgroundColor={colors.dark} />
            {deleteButton && <View style={styles.edit}>
              <Fab 
                backgroundColor={'#F44336'} 
                icon={'delete'} 
                onPress={() => Alert.alert(
                  "Delete",
                  "Are you sure to delete this post?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed")
                    },
                    { text: "yes", onPress: () => deletePosts(id) }
                  ],
                  { cancelable: false }
                )}
              />
            </View>}
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
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.icons}>
          <ToggleButton
            activeNode={<MaterialIcons name="favorite" size={32} color={colors.secondary} />}
            inActiveNode={
              <MaterialIcons name="favorite-border" size={32} color={colors.secondary} style={{ opacity: 0.8 }} />
            }
            size={32}
            active={like}
            onPress={() => {
              setLike(prev => !prev);
              likePost(id);
            }}
          />
          <AppText style={{ color: colors.medium }}>{count}</AppText>
        </View>
      </View> 
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
    height: imageHeight,
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  edit: {
    position: 'absolute',
    marginLeft: '85%',
    marginTop: imageHeight-iconSize,
  },
});

export default Card;

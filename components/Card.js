import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Chip, FabSpeedDial, Fab, ToggleButton, Icon } from 'material-bread';

import AppText from "./AppText";
import colors from "../config/colors";
import ListItemSeparator from "./ListItemSeparator";

function Card({ title, tags, image, onPress, description }) {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);


  const actionsExtended = [
    <Fab key={1} backgroundColor={'#009688'} icon={'edit'} style={styles.fab} />,
    <Fab key={2} backgroundColor={'#F44336'} icon={'delete'} />,
  ];
   
  return (
    
      <View style={styles.card}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <Image style={styles.image} source={{ uri: `data:image/png;base64,${image}`}} resizeMode='contain' backgroundColor={colors.dark} />
            <View style={styles.detailsContainer}>
              <View style={styles.edit}>
                <FabSpeedDial
                  actions={actionsExtended}
                  fab={<Fab icon="add" />}
                />
              </View>
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
        <ListItemSeparator />
        <View style={styles.icons}>
          <ToggleButton
            activeNode={<Icon name="arrow-up-bold" size={32} color={'green'} iconComponent={MaterialCommunityIcons} />}
            inActiveNode={
              <Icon
                name="arrow-up-bold-outline"
                size={32}
                style={{ opacity: 0.5 }}
                color={'green'}
                iconComponent={MaterialCommunityIcons}
              />
            }
            size={32}
            active={up}
            onPress={() => {
              setUp(prev => !prev);
              if(down){
                setDown(prev => !prev);
              }
            }}
          />
          <ToggleButton
            activeNode={<Icon name="arrow-down-bold" size={32} color={'red'} iconComponent={MaterialCommunityIcons} />}
            inActiveNode={
              <Icon
                name="arrow-down-bold-outline"
                size={32}
                style={{ opacity: 0.5 }}
                color={'red'}
                iconComponent={MaterialCommunityIcons}
              />
            }
            size={32}
            active={down}
            onPress={() => {
              setDown(prev => !prev);
              if(up){
                setUp(prev => !prev)
              }
            }}
          />
          <AppText>+50</AppText>
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
    alignItems: 'center',
  },
  edit: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
});

export default Card;

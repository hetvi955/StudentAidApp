import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import AppText from "./AppText";

function CategoryPickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
          <Icon
            backgroundColor={item.backgroundColor}
            name={item.icon}
            size={50}
          />
          <AppText style={styles.label}>{item.label}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
    flexDirection: 'row',
  },
  label: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default CategoryPickerItem;

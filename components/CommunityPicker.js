import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    FlatList,
} from "react-native";
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Icon } from 'material-bread';

import AppIcon from './Icon';
import ListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';
import colors from '../config/colors';
import AppText from './AppText';
import Screen from './Screen';


function CommunityPicker({items, placeholder, name, width}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('');
    const { values, setFieldValue } = useFormikContext()

    const communities = values[name];

    const handleAdd = (item) => {
        setFieldValue(name, [...values[name], item]);
        console.log(values[name]);
    }
    const handleRemove = (item) => {
        setFieldValue(
            name,
            values[name].filter((ele) => ele.value !== item.value)
        );
    };
    
    return (
        <>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={[styles.container, { width }]}>
            
            {communities ? 
            (<AppText style={styles.placeholder}>
                {(communities.map((community) =>
                `${community.label} ` 
                ))}
            </AppText>) 
            : (
                <AppText style={styles.placeholder}>{placeholder}</AppText>
            )}

            <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={colors.medium}
            />
            </View>
        </TouchableWithoutFeedback>
        <Modal visible={modalVisible} animationType="slide">
            <Screen style={styles.modal}>
                <View style={styles.buttonContainer}>
                    <Button text={'Close'} type="contained" 
                    color={'#F44336'} icon={<Icon name="close" />} radius={20} 
                    onPress={() => setModalVisible(false)}
                    />
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                        <View 
                        style={{ backgroundColor: selected == item.value.toString() ? colors.primary : colors.white }}
                        onPress={() => setSelected(item.value.toString())}
                        >
                            <ListItem
                                title={item.label}
                                IconComponent={<AppIcon name={item.icon} backgroundColor={colors.medium} />}
                            />
                            <ListItemSeparator />
                        </View>
                    )}
                    extraData={selected}
                />
            </Screen>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 25,
      flexDirection: "row",
      padding: 15,
      marginVertical: 10,
    },
    placeholder: {
      color: colors.medium,
      flex: 1,
    },
    text: {
      flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 20,
    },
    modal: {
        flex: 1,
        backgroundColor: colors.light,
    }
  });

export default CommunityPicker;




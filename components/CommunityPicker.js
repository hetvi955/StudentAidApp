import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    FlatList,
} from "react-native";
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Icon, DataTable, DataTableCell, DataTableRow } from 'material-bread';

import AppIcon from './Icon';
import AppListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';
import colors from '../config/colors';
import AppText from './AppText';
import Screen from './Screen';
import ListItem from './ListItem';


function CommunityPicker({items, placeholder, name, width}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedItems, setUpdatedItems] = useState(items.map(item => ({...item, selected: false})));
    const { values, setFieldValue } = useFormikContext()

    
    return (
        <>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={[styles.container, { width }]}>
    
            <AppText style={styles.placeholder}>{placeholder}</AppText>

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
                <DataTable>
                    <FlatList
                        data={updatedItems}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <DataTableRow
                                hover
                                showCheckbox
                                selected={item.selected}
                                onPressCheckbox={() => {
                                    item.selected = !item.selected;
                                    setUpdatedItems(
                                        updatedItems.map(ele => ele.value === item.value ? {...item, selected: item.selected} : ele)
                                    );
                                    setFieldValue(name, updatedItems.filter(ele => ele.selected));
                                    // console.log(values[name]);
                                }}
                                style={styles.list}
                            >
                                <AppIcon 
                                    name="account-group-outline" 
                                    backgroundColor={colors.medium}
                                    
                                />
                                <AppText style={styles.icon}>{item.label}</AppText>
                            </DataTableRow>
                        )}
                    />
                    
                </DataTable>
                
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
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    icon: {
        marginLeft: 10
    }
  });

export default CommunityPicker;





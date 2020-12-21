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
import { Button, Icon, DataTable, DataTableRow, DataTableCell } from 'material-bread';

import AppIcon from './Icon';
import AppListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';
import colors from '../config/colors';
import AppText from './AppText';
import Screen from './Screen';
import ListItem from './ListItem';
import communityApi from "../api/community";


function CommunityPicker({ placeholder, name, width }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedItems, setUpdatedItems] = useState([]);
    const { setFieldValue } = useFormikContext();

    const getitems = async() => {
        const result = await communityApi.getCommunities();
        if(!result.ok){
            console.log(result.problem, result.originalError);
            if(result.data){
                console.log(result.data.message);
            }
        }
        const array = result.data.data.map(community => ({...community, selected: false}));
        setUpdatedItems(array);

    }

    useEffect(() => {
        getitems();
    },[]);

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
                    <MaterialCommunityIcons name="refresh" size={30} color={colors.primary} onPress={() => { getitems(); }} />
                    <MaterialCommunityIcons name="window-close" size={30} color={colors.secondary} onPress={() => setModalVisible(false) } />
                </View>
                {updatedItems && 
                <DataTable>
                    <FlatList
                        data={updatedItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DataTableRow
                                showCheckbox
                                selected={item.selected}
                                onPressCheckbox={() => {
                                    item.selected = !item.selected;
                                    setUpdatedItems(
                                        updatedItems.map(ele => ele.id == item.id ? {...item, selected: item.selected} : ele)
                                    );
                                    const filter = updatedItems.filter(item => item.selected).map(ele => ele.id);
                                    setFieldValue(name, filter);
                                }}
                                style={styles.list}
                            >
                                <DataTableCell>
                                    <AppIcon 
                                        name="account-group-outline" 
                                        backgroundColor={colors.medium}
                                        
                                    />
                                    <AppText style={styles.icon}>{item.communityName}</AppText>
                                </DataTableCell>
                            </DataTableRow>
                        )}
                    /> 
                </DataTable>}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
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





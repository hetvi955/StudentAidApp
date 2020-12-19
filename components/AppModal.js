import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import * as Yup from "yup";
import { Button, Icon } from 'material-bread';

import { AppForm as Form, AppFormField as FormField, SubmitButton, ErrorMessage } from '../components/forms';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import community from "../api/community";

const validationSchema = Yup.object().shape({
    communityId: Yup.string().required().min(1).label("Community ID"),
});

function AppModal({ visible = false, navigation, setVisible }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState();
    const joinCommunityApi = useApi(community.join);

    useEffect(() => {
        setModalVisible(visible);
    },[])
  
    const handleSubmit = async({ communityId }, { resetForm }) => {
      const result = await joinCommunityApi.request(communityId.trim());
      if (!result.ok) {
        if (result.data) setError(result.data.message);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }
        return;
      }else {
        resetForm();
        setError();
        // navigation.navigate("CommunityPage", { id : result.data.data.communityId, isAdmin: false });
        console.log(result.data.data);
      }
    }

    return (
        <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modal}>
                <View style={styles.buttonContainer}>
                    <Button text={'Close'} type="contained" 
                    color={'#F44336'} icon={<Icon name="close" />} radius={20} 
                    onPress={() => {
                        setModalVisible(false);
                        setVisible(false);
                    }}
                />
                </View>
                <View style={styles.InputContainer}>
                    <Form
                        initialValues={{
                        communityId: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <ErrorMessage error={error} visible={error} /> 
                        <FormField maxLength={255} name="communityId" placeholder="Community ID" autoCapitalize="none" />
                        <SubmitButton title="Join" />
                    </Form>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 20,
    },
    modal: {
        flex: 1,
        backgroundColor: colors.light,
    },
    InputContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.light,
    },
})

export default AppModal;
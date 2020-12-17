import React from 'react';
import { useFormikContext } from "formik";
import { Switch, View, StyleSheet } from "react-native";

import colors from '../config/colors';
import AppText from './AppText';

function AppSwitch({ name, title }) {
    const { setFieldValue, values } = useFormikContext();
    const isEnabled = values[name]
    const toggleSwitch = () => setFieldValue(name, !isEnabled);
    
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>{title} </AppText>
            <Switch
                trackColor={{ false: colors.medium , true: colors.primary }}
                thumbColor={isEnabled ? colors.primary : colors.primary}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.medium
    }
})

export default AppSwitch;
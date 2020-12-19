import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ScheduleWork = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [datetime, setDateTime] = useState('');
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("Date time has been picked ", date);
        setDateTime(date);
        hideDatePicker();
    };

    return (
        <View>
            <Button title="Set reminder for your note" onPress={showDatePicker} />
            <Text>Title: {props.route.params.title}</Text>
            <Text>Alarm set at {props.route.params.alarm}</Text>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {
                /* 
                When alarm is set for a particular note, update the alarm of that note in the db, 
                use handleConfirm function for updation,
                then go back to the dailywork screen
                */
            }
        </View>
    );
};

export default ScheduleWork;
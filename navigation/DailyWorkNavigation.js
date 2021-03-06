import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import DailyWork from '../Screens/DailyWorkScreen';
import NewNote from '../Screens/addNoteScreen';
import NoteDetail from '../Screens/NoteDetailScreen';
import ScheduleWork from '../Screens/ScheduleWorkScreen'


const Stack = createStackNavigator();

const DailyWorkNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notes" component={DailyWork} />
            <Stack.Screen
                name="NewNote"
                component={NewNote}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen name="Schedule" component={ScheduleWork} />
            <Stack.Screen name="Note" component={NoteDetail} />
        </Stack.Navigator>
    )
}

export default DailyWorkNavigator;


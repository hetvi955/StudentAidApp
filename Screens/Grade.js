import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableHighlight} from 'react-native-gesture-handler';

import {ListItem, List, Avatar, ProgressCircle, Fab} from 'material-bread';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import {
  AppForm as Form,
  AppFormField as Field,
  SubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import {BorderlessButton} from 'react-native-gesture-handler';
// Returns the shared instance of the Realm app.
const getData = async (setAtt) => {
  try {
    let att;
    const value = await AsyncStorage.getItem('att_data');
    if (value !== undefined) {
    } else {
      att = JSON.parse(value);
      console.log(att);
    }
    setAtt(att);
  } catch (e) {
    console.log(e); // error reading value
  }
};

const markAttendance = async (subjectName, isPresent, Att, setAtt) => {
  let dupe = Att;
  dupe.map((v, i, a) => {
    if (v.Name == subjectName) {
      if (isPresent) {
        dupe[i].Present += 1;
      }
      dupe[i].Total += 1;
    }
  });
  try {
    AsyncStorage.setItem('att_data', JSON.stringify(dupe)).then(() => {
      setAtt(false);
    });
  } catch (e) {
    console.log(e);
  }
};

const setData = async (data, Att) => {
  let attendance = Att;
  attendance.push(data);
  try {
    console.log(attendance);
    await AsyncStorage.setItem('att_data', JSON.stringify(attendance));
  } catch (error) {
    console.log(error);
  }
};
const validationSchema = Yup.object().shape({
  Name: Yup.string().required().label('Subject name'),
});
const Attendance = () => {
  const [Fresh, setFresh] = useState(true);
  const [Att, setAtt] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  getData(setAtt).then();
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderBottomColor: '#666',
            borderBottomWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: '700',
            }}
          >
            Attendance Tracker
          </Text>
        </View>

        <List style={{minWidth: 400}}>
          {Att.map((sub, i) => (
            <ListItem
              key={i}
              text={sub.Name}
              media={
                <Fab
                  type="icon"
                  icon={'book'}
                  backgroundColor={
                    '#' + Math.random().toString(16).substr(2, 6)
                  }
                />
              }
              onPress={() => {
                console.log('checked');
              }}
              actionItem={
                <>
                  <Fab
                    backgroundColor={'#70BD53'}
                    icon={'thumb-up'}
                    onPress={() =>
                      markAttendance(sub.Name, true, Att, setFresh)
                    }
                  />
                  <>
                    <Text> </Text>
                  </>
                  <Fab
                    backgroundColor={'#D92929'}
                    icon={'thumb-down'}
                    onPress={() =>
                      markAttendance(sub.Name, false, Att, setFresh)
                    }
                  />
                  <>
                    <Text> </Text>
                  </>
                  <ProgressCircle
                    value={sub.Total == 0 ? 1 : (sub.Present / sub.Total) * 100}
                    size={48}
                    thickness={22}
                    color="#2b80ff"
                    unfilledColor="#f2f2f2"
                    animationMethod="timing"
                    animationConfig={{speed: 1}}
                    shouldAnimateFirstValue
                    determinate
                  />
                  <>
                    <Text></Text>
                  </>
                  <>
                    <Text>
                      {' '}
                      {sub.Total == 0
                        ? 0
                        : Math.round((sub.Present / sub.Total) * 100)}
                      {'%'}
                    </Text>
                  </>
                </>
              }
            />
          ))}
        </List>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
      >
        <View style={styles.modalView}>
          {/* <Text>Sundaram</Text>
          <Button title="Close" onPress={() => setmodalVisible(false)}></Button> */}
          <Form
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              let sub = new Subject(values.Name);
              setData(sub, Att)
                .then(() => {
                  setmodalVisible(false);
                  console.log(values.Name);
                })
                .catch((e) => console.log(e));
            }}
            initialValues={{Name: ''}}
          >
            <Field
              autoCapitalize="characters"
              autoCorrect={true}
              icon="book"
              name="Name"
              placeholder="Subject Name"
              textContentType="emailAddress"
            />
            <SubmitButton title="ADD SUBJECT" />
          </Form>
        </View>
      </Modal>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            setmodalVisible(true);
          }}
        >
          <View>
            <Text style={{fontSize: 30, color: 'white'}}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

class Subject {
  constructor(Name, Present = 0, Total = 0) {
    this.Name = Name;
    this.Present = Present;
    this.Total = Total;
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#ee2b7a',
    flex: 1,
    color: 'white',

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 25,
    bottom: 20,
    right: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Attendance;

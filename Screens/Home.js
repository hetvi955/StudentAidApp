import React from 'react';
import {View,  
  Text, 
  Image, 
  SafeAreaView, 
  StyleSheet,
  Dimensions } from 'react-native';
import students from '../assets/students.png';
import { AppLoading } from "expo";
import {

  useFonts,
  Raleway_200ExtraLight,
} from '@expo-google-fonts/raleway';
import {
  Karla_400Regular,
} from '@expo-google-fonts/karla';
import { Video } from 'expo-av';
const { height , width} = Dimensions.get('window');

export default function Home() { 
  let [fontsLoaded] = useFonts({
   Raleway_200ExtraLight,
   Karla_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
  
    <SafeAreaView >

      <View style={{ flexDirection: 'row'}}>
      <Text style={{
            fontSize:12,
            marginTop:0.13*height,
            position: 'absolute',
            fontFamily: 'Karla_400Regular',
            transform: [{ rotate: "90deg" }],
            color:'	rgb(100,100,100)'
          }}>Swipe right.</Text>

           <Image source={require('../assets/animations/right.gif')}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{
            width:50,
            height:40,
            marginTop:0.04*height,
            position: 'absolute',
            marginLeft:10
          }}
        ></Image> 
          <Image source={require('../assets/animations/handShake.gif')}
          rate={1}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.animationTop}
        ></Image> 
  
      <Image source={require('../assets/animations/notepad.gif')}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{width: 110,
              height: 110,
              marginLeft: 0.12*width,
              marginTop:0.07*height}}
     ></Image> 
      </View>

      <Text
          style={{
            fontSize:35,
            alignSelf:"center",
            marginTop:0.02*height,
            marginLeft: 0.08*width,
            fontFamily: 'Raleway_200ExtraLight',
            color:'rgb(100,140,160)'
          }}>
          One solution for all your worries!
      </Text>

      <View style={{ flexDirection: 'row'}}>
      <Image source={require('../assets/animations/calender.gif')}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{ width: 100, height: 100, margin:0.12*width}}
     ></Image> 
  
      <Image source={require('../assets/animations/idea.gif')}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.animationBottom}
     ></Image> 
      </View>
      <Image source={students} style={{ marginTop : 0, alignSelf: "center", width : width, height : 330}}></Image>
    </SafeAreaView>
  )};
}

const styles = StyleSheet.create({
  animationTop: {
    width: 115,
    height: 115,
    marginTop: 0.13*height,
    marginLeft:0.17*width
  },
  animationBottom: {
    width: 90,
    height: 90,
    marginTop: 0.015*height,
    marginLeft: 0.20*width
  }
});


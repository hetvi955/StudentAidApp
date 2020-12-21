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
            fontSize:11,
            marginTop:0.09*height,
            position: 'absolute',
            fontFamily: 'Karla_400Regular',
            transform: [{ rotate: "90deg" }],
            color:'	rgb(128,128,128)'
          }}>Swipe right.</Text>
      <Video source={require('../assets/animations/handShake.mp4')}
      rate={1}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.animationTop}
     ></Video> 
  
      <Video source={require('../assets/animations/notepad.mp4')}
      rate={0.5}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{width: 110,
              height: 110,
              marginLeft: 0.12*width,
              marginTop:0.07*height}}
     ></Video> 
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
      <Video source={require('../assets/animations/dueDates.mp4')}
      rate={0.4}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{ width: 210, height: 210, marginTop: 0}}
     ></Video> 
  
      <Video source={require('../assets/animations/idea.mp4')}
      rate={0.8}
      isMuted={true}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={styles.animationBottom}
     ></Video> 
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
    marginTop: 0.005*height,
    marginLeft: 0.15*width
  }
});


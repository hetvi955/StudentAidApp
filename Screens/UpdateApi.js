import React from 'react'
import {View, Text, ActivityIndicator, StatusBar, StyleSheet,  Linking, ScrollView, SafeAreaView} from 'react-native';
import { create } from 'apisauce';
import { Component } from 'react';
import { FlatList } from 'react-native-gesture-handler';


/* // define the api
const api = create({
  baseURL: 'http://api.adzuna.com/v1/api',
  headers: { timeout: 20000 },
}) */


export default class Updates extends Component{
        constructor(props){
          super(props);
          this.state= {
            data: null,
            isLoading: true,

          }
        }
        componentDidMount(){
          return (
            fetch('https://api.adzuna.com/v1/api/jobs/in/search/2?app_id=6fb4d871&app_key=51579f6594c9d91943719f071dfcff72&results_per_page=15')
            .then((response)=> response.json())
            .then((responseJson)=>{
              this.setState({
                isLoading: false,
                data: responseJson.results
              })
            })
            .catch(err=> console.log(err))
            )
        }

        render(){

          if(this.state.isLoading) {
            return (
              <ScrollView style={{flex: 1, padding:10}}>
                <ActivityIndicator/>
              </ScrollView>
            ) 
            
           }else{
             let updates= this.state.data.map((val, key)=>{
               return <View key={key} >
                 
                 <Text style={styles.head}>{val.company.display_name}</Text>
                 <Text style={styles.type}>{val.contract_type}</Text>
                 <Text style={styles.location}>{val.location.area}</Text>
                 <Text style={styles.desc}>{val.description}</Text>
                 <Text style={styles.link}
                      onPress={() => Linking.openURL(val.redirect_url)}>
                  Read more..
                </Text>
               </View>
             })
            return (
              <ScrollView style={styles.container}>
                <Text style={styles.top}>Here's your weekly Job update! </Text>
                 {updates} 
              </ScrollView>
             )
           }
        }
        
    }

    const styles = StyleSheet.create({
     
      container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        margin:10
      },
      top: {
        marginLeft:10,
        marginTop:15,
        fontWeight: "100",
        fontSize: 23,
        color:"blue",
        fontFamily:"Roboto"
      },
      head: {
        marginLeft:10,
        marginTop:15,
        fontWeight: "bold",
        fontSize: 20
      },
      type: {
        marginLeft:10,
        fontSize: 15,
        fontFamily: 'Roboto'
      },
      location: {
        marginLeft:10,
        fontSize: 13,
        fontFamily:'sans-serif-light'
      },
      desc: {
        marginLeft:10,
        padding:5,
        fontSize: 13,
        fontFamily:'sans-serif-condensed'
      },
      link: {
        marginLeft:10,
        fontSize: 12,
        fontFamily:'sans-serif-light',
        color:"navy"
      }
    });


import React, { useEffect, useState } from 'react'
import {View,
  Text,
  ActivityIndicator, 
  StatusBar, 
  StyleSheet,  
  Linking, 
  ScrollView, 
  SafeAreaView, 
  TextInput} from 'react-native';

function Update() {
  const [data, setData]= useState([]);
  const [loading, setLoading]= useState(true);
  const [query, setQuery]= useState("");

  const baseurl="https://api.adzuna.com/v1/api/jobs/in/search/2?app_id=05f5b785&app_key=d7a69091c7366d575983bb8b0afad7b0&results_per_page=15&what_and="+{query};

function getData() {
    return (
      fetch(baseurl)
      .then((response)=> response.json())
    )
  }

  useEffect(()=>{
    getData()
    .then((responseJson)=>{
     setData(responseJson.results),
     setLoading(false)
    }) 
    .catch(err=> console.log(err))
  },[]);

    if(loading) {
      return (
        <ScrollView style={{flex: 1, padding:10}}>
          <ActivityIndicator/>
        </ScrollView>
      ) 
      
     }else{
       let updates= data.map((val, key)=>{
         return <SafeAreaView key={key} >
           
           <Text style={styles.head}>{val.company.display_name}</Text>
           <Text style={styles.type}>{val.contract_type}</Text>
           <Text style={styles.location}>{val.location.area}</Text>
           <Text style={styles.desc}>{val.description}</Text>
           <Text style={styles.link}
                onPress={() => Linking.openURL(val.redirect_url)}>
            Read more..
          </Text>
         </SafeAreaView>
       })

      return (
        <ScrollView style={styles.container}>
          <Text style={styles.top}>Here's your weekly Job update! </Text>
          <Text style={styles.search}>Couldn't find what you are looking for? Search here. </Text>
          <TextInput value={query} placeholder="Search category" onChangeText={(query)=>{setQuery(query), console.log(query), console.log(baseurl)}}  
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin:10 , borderRadius: 5 , padding: 10}} />
           {updates} 
        </ScrollView>
        
       )
     }
  }

export default Update;

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
        color:"olive",
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
      search: {
        marginLeft:10,
        paddingTop:8,
        fontSize: 11,
        fontFamily:'sans-serif-light',
        color:"grey"
      },
      link: {
        marginLeft:10,
        fontSize: 12,
        fontFamily:'sans-serif-light',
        color:"navy"
      }
    });


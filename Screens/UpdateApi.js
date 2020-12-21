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
import colors from '../config/colors';
import Separator from '../components/ListItemSeparator';
import { Card, CardContent, Chip } from 'material-bread';
import { camelcaseToArray } from '../config/makeHashtags';

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
           <Card style={styles.card} onPress={() => Linking.openURL(val.redirect_url)}>
            <CardContent>
              <Text style={styles.head}>{val.company.display_name}</Text>
              <Text style={styles.type}>{val.contract_type}</Text>
              <View style={styles.location}>
              {val.location.area.map((ele, i) => (
                  i == 0 ?
                  <Text key={i} style={{ fontSize: 15, fontWeight: '500' }}>{ele} - </Text> :
                  <Chip text={ele} key={i} style={{ marginHorizontal: 10 }} />
              ))}
              </View>
              <Text style={styles.desc}>{val.description}</Text>
            </CardContent>
           </Card>
         </SafeAreaView>
       })

      return (
        <ScrollView style={styles.container}>
          <Text style={styles.top}>Here's your weekly Job update! </Text>
          <Text style={styles.search}>Couldn't find what you are looking for? Search here. </Text>
          <TextInput value={query} placeholder="Search category" onChangeText={(query)=>{setQuery(query), console.log(query), console.log(baseurl)}}  
          style={styles.searchBox} />
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
        backgroundColor: colors.light,
      },
      top: {
        marginLeft:10,
        marginTop:15,
        fontWeight: "200",
        fontSize: 23,
        color: colors.primary,
        fontFamily:"Roboto"
      },
      head: {
        fontWeight: "bold",
        fontSize: 20
      },
      type: {
        fontSize: 15,
        fontFamily: 'Roboto',
        color: colors.secondary,
      },
      location: {
        flexDirection: 'row',
        marginVertical: 10,
        flexWrap: "wrap",
        alignItems: 'center',
      },
      desc: {
        fontSize: 13,
        fontFamily:'sans-serif-condensed',
        color: colors.medium,
        paddingTop: 5,
      },
      search: {
        marginLeft:10,
        paddingTop:8,
        fontSize: 11,
        fontFamily:'sans-serif-light',
        color:"grey"
      },
      card: {
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: colors.black,
        padding: 5,
      },
      searchBox: { 
        height: 40, 
        margin:10,
        borderRadius: 15,
        padding: 10,
        backgroundColor: colors.white,
      }
    });


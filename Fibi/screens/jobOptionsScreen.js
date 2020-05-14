import React from 'react';
import {Dimensions, StyleSheet,Platform,TouchableOpacity, Text,Image, View,ScrollView,ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Cards from '../containers/cardViewJob';


// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 3;

class JobOptionScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle:  () =>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Image
                    source={require('../images/logo_small.jpg')}
                    style={{width:40, height:40, flex:1}}
                    resizeMode="contain"
                />
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{
                    alignSelf:'center',
                    color: 'green',
                    fontSize: 20,
                    fontFamily:Platform.OS === 'ios'? 'Avenir': 'serif',}}>
                      FIBI
                  </Text>
                </View>
            </View>
        ,

          headerRight: () =>            
           <TouchableOpacity onPress={()=> navigation.navigate('AddJob')}>
             <Ionicons
                name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                size={40}
                color={'green'}
                style={{marginRight:20}}
              />
            </TouchableOpacity> 
          ,
          headerTitleStyle: {
              textAlign: "center",
              justifyContent: 'center',
              alignItems: 'center',
              flex:1,
              color: 'green',
              fontSize: 25,
          },
        };
      };

    constructor(props){
      super(props);
      this.state = {
        searching : false,  //boolean to switching the loading screen indicator on and off
      }
    }

  //function to get the selected type of job and search through 
  //the redux for the companies that hire for that job
  jobclicked = (job) => {
  
    const {data} = this.props;
    var results = [];
    for (var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[i].jobsArr.length; j++){
        
        if (data[i].jobsArr[j] === job) {
              results.push(data[i]);
          }
      }
    }
    
    this.props.navigation.navigate('JobsData', {name: results});
  }

  render() {

    const arr = [
                'Accounting','Actuarial Science','Biomedical Engineering', 'mechanical engineering','eletrical Engineering',
                'business','media','Marketing', 'android','ios',
                'microsoft','dell','macbook', 'laptop','phones',
                'asus','ipad','wallet', 'book','charger',
                'flash','pen','ruler', 'calculator','deodorant'
              ]

    var rgb = Math.floor(Math.random() * 256)
    
    
    return (
      <View style = {styles.background}>
        {this.state.searching ? 
          <View style={{justifyContent:'center', marginTop: 10}}>
            <ActivityIndicator size="large" color="#2ae815" />
          </View> 
          :
           null 
        }
        <View>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            { arr.map((job,index) =>  
                    <View style={[styles.container, styles.space]} key={index}>
                        <Cards clickedJob={this.jobclicked} jobName={job} key={index}/>
                    </View>
            )}
          </ScrollView>
        </View>
    </View>
    
    
    );
  }
}

const mapStateToProps = state => {
  return {
    data:  state.data.jobs,      //array of jobs
    status: state.data.error,    //string of error message if an error occurs during fetch
    pending: state.data.pending, //boolean true during fetching of API data and false before and after fetching  
  };
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
  space :{
    marginBottom:10,
    marginTop:10,
  },
  paragraph: {
  margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',
},
about: {
  height : 150,
},
  text: {
    fontSize:30
  },
  background: {
    backgroundColor: '#ecf0ff',
    flex: 1,
  },
  
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  about: {
    height : 150,
    borderRadius: 10
  }, 
  container: {
    marginLeft: 10,                           //how left the images to the left of each other
    marginBottom: 5,                          //space between images going down each column
    height: (height - 80 - 80 ) / rows - 40,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 5,                 // rounded corners
    //...StyleSheet.absoluteFillObject, // fill up all space in a container
    flex:1,
    resizeMode:'contain',
  },
});

export default connect(mapStateToProps,null)(JobOptionScreen);
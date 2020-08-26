import React from 'react';
import {Dimensions, StyleSheet, Text, View,ScrollView,
         TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'
import { formatDistance} from 'date-fns'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

let timer = null; //variable to use for closing the timer

export default class ForumCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        lockClick : false, //boolean used to handle debouncing when a click occurs
    }
  }

  handleClick = (data) => {

    if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
    this.setState({                 
            lockClick : true              //lock the clickable object
    })

    this.props.handleClick(data);

    timer = setTimeout(() => {              //for handling debouncing
      this.setState({                       //set lockClick to true after 1 sec
        lockClick : false
      })
    }, 1000);
  }
  
  render() {
    const {id_,headlines} = this.props;
    const datePosted = formatDistance(Date.parse(headlines.publishedAT),new Date());
    
    return (
        <TouchableOpacity onPress={() =>this.handleClick(headlines)}>
          <View style={{height: height * 0.215, width: width, backgroundColor:  'white',
            borderBottomWidth :1,
            borderBottomColor: '#f0f0f0',marginTop: 5}}>
            <View style={{flex:3,flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image source={{ uri: headlines.urlToImage }} style={styles.image} />
                </View>
                <View style={{flex:3}}>
                    <View style={styles.title}>
                        <Text style={{flex:1,fontSize: wp('4.75%'), fontWeight:'bold', color:'black'}}
                         numberOfLines={1}> {headlines.title}</Text>
                    </View>
                    <View style={styles.text}> 
                        <Text style={{flex:1, fontSize: wp('4.75%'), color:'gray',marginLeft:5,marginRight:3}} 
                            numberOfLines={4}>
                            {headlines.content}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.feedback}>
                <View style={styles.write}>
                    <Text style={{flex:1, fontSize: 16, color:'gray'}}> 
                        {headlines.source.name} </Text>
                </View>
                <View style={styles.write}>
                    <Text style={{flex:1,alignSelf:'flex-end', fontWeight:'bold',
                                color:'gray',marginRight:10}}> {datePosted} ago</Text>
                </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: height * 0.215,
    width: width,
    backgroundColor: 'white',
  },
  title: {
    flex:1,
   // backgroundColor:'green'
  },
  text: {
    flex:3,
    alignSelf: 'flex-start',
   // backgroundColor:'blue',
    
  },
  feedback: {
    flex:1,
    flexDirection:'row',
  },
  write: {
    flex:1,
    //flexDirection:'row',
    alignItems:'center'
  },
  image: {
    // marginLeft:10,
    // borderRadius: 10,                   // rounded corners
    height:65,
    width:65,
  },
});
import React, {Component} from 'react'
import {Platform,ImageBackground,Dimensions,TouchableOpacity, StyleSheet, Text, View} from 'react-native';

const { width, height } = Dimensions.get('window');


var randomImg = [
  require('../images/Cinnamint.jpg'), require('../images/EasyMed.jpg'),    
  require('../images/EndlessRiver.jpg'), require('../images/GreenandBlue.jpg'), 
  require('../images/LemonTwist.jpg'), require('../images/Limeade.jpg'),     
  require('../images/Mild.jpg'), require('../images/Mojito.jpg'),    
  require('../images/NeonLife.jpg'), require('../images/Ohhappiness.jpg'),
  require('../images/PacificDream.jpg'), require('../images/Quepal.jpg'),    
  require('../images/SummerDog.jpg'),require('../images/TealLove.jpg'),    
  require('../images/UnderLake.jpg'), require('../images/Vine.jpg')];  

export default class SpecificQuestionScreen extends Component {
    // openDetailedQuery = () => {
    //     this.props.navigation.push('detailedForum');
    // }

    //get the category of the type of question
    //and send it to function 'openQuestions' in file ForumOptionsScreen.js
    handleClick = (job) => {
        this.props.openOptions(job);
     }

    render() {    
        const {openOptions,chatOptions} = this.props   
        
        return (
          <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <View style={styles.shadow}>
                <TouchableOpacity activeOpacity={.4} onPress={() =>this.handleClick(chatOptions.occupation)}>
                    <ImageBackground source={ randomImg[Math.floor(Math.random()*randomImg.length)]} 
                        style={styles.about}
                        imageStyle={[styles.cardRadius]}>
                        <View style={styles.contents}>
                            <Text style={styles.text}>{chatOptions.occupation}</Text>
                        </View>
                        <View style={styles.questions}>
                            <Text style={styles.textBelow}>Questions </Text>
                            <View style={styles.circle}>
                                <Text style={styles.number}> {chatOptions.questions} </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    
const styles = StyleSheet.create({
shadow: {
    backgroundColor:'#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
    width: 5,
    height: 5,
    },
    elevation:14,
    shadowRadius: 2,
    shadowOpacity: 0.9,
},
about: {
    height : height* 0.145,
    width : width*0.93, 
},
cardRadius: {
    borderRadius: 10
},
contents: { 
    alignItems:'center', 
    justifyContent: 'center',
    flex:4,
},
questions: { 
    alignItems:'center',
    marginRight:10,
    alignSelf: 'flex-end',
    flexDirection:'row',
    marginBottom:6,
    flex:1,
},
text : {
    fontSize: 25, 
    fontWeight:'bold', 
    color:'white'
},
textBelow : {
    fontSize: 13, 
    fontWeight:'bold', 
    color:'white'
},
circle : {
    height:20,
    width: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems:'center', 
    justifyContent: 'center',
},
number : {
    fontWeight : 'bold',
    fontSize: 12,
    color: 'gray'
}
});
import React from 'react';
import {ImageBackground,Dimensions, StyleSheet, 
        TouchableOpacity, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 3;

var randomImg = [
    require('../images/2.jpg'),    
    require('../images/10.jpg'), require('../images/4.jpg'), 
    require('../images/5.jpg'), require('../images/6.jpg'),     
    require('../images/7.jpg'), require('../images/8.jpg'),    
    require('../images/9.jpg'), require('../images/19.jpg'),
    require('../images/11.jpg'), require('../images/12.jpg'),    
    require('../images/13.jpg'), require('../images/14.jpg'), 
    require('../images/15.jpg'), require('../images/16.jpg'),     
    require('../images/17.jpg'), require('../images/18.jpg'),    
    require('../images/3.jpg'), require('../images/20.jpg'),
    require('../images/21.jpg'), require('../images/22.jpg'),
    require('../images/23.jpg'), require('../images/24.jpg'),     
    require('../images/25.jpg'), require('../images/26.jpg'),    
    require('../images/0.jpg'), require('../images/1.jpg')]; 
    
let timer = null; //variable to use for closing the timer

export default class MainOptionsCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lockClick : false, //boolean used to handle debouncing when a click occurs
      }
    }
  
    //get the occupation for the card clicked
    handleClick = (data,type) => {

        if(this.state.lockClick)return  //if a click has already occured and 1 sec hasn't elapsed just return and do nothing
        this.setState({                 
                lockClick : true              //lock the clickable object
        })

        if(type === 'jobs'){    //if the jobs is clicked on the card
            this.props.clickedJob(data.occupation);
        }
        else if(type === 'questions'){  //if questions is clicked on the card
            this.props.clickedForum(data.occupation);
        }     
        else if(type === 'modal'){
            this.props.openModal(data)
        }
        
        timer = setTimeout(() => {              //for handling debouncing
            this.setState({                       //set lockClick to true after 1 sec
              lockClick : false
            })
        }, 1000);
        
    }

    render() {  
        //if empty is true make the item invisible
        if(this.props.data.empty === true){
            return (
            <View style={styles.itemInvisible}/>
        )}
        return (
        <View style={{flex:1}}>         
            <ImageBackground source={ randomImg[parseInt(this.props.data.id)%26]} 
                style={[styles.shadow,styles.imageContainer]}
                imageStyle={{ borderRadius: 10}}
            >
                <TouchableOpacity activeOpacity={0.1} style={{flex:1}}
                    onPress={() => this.handleClick(this.props.data,'modal')} 
                    >
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            {this.props.data.occupation}
                        </Text>
                    </View>
                    {
                        this.props.data.special ? 
                            // if the card is special e.g. General, University,etc..
                            //show the view below
                            <View style={styles.specialQuestions}>
                                <TouchableOpacity
                                        activeOpacity={0.1} style={{flex:1,flexDirection:'row-reverse',}}
                                        onPress={() => this.handleClick(this.props.data,'questions')}>
                                    <View style={styles.circle}>
                                        <Text style={styles.number}> {this.props.data.questions} </Text>
                                    </View>
                                    <Text style={styles.textBelow}>{this.props.data.displayRight} </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            //if the card is not special show this card
                            <View style={{flexDirection:'row'}}>
                              
                                <View style={styles.questions}>
                                    <TouchableOpacity
                                        activeOpacity={0.1} style={{flex:1,flexDirection:'row',flexDirection:'row',}}
                                        onPress={() => this.handleClick(this.props.data,'questions')} 
                                        >
                                        <Text style={styles.textBelow}>Questions </Text>
                                        <View style={styles.circle}>
                                            <Text style={styles.number}> {this.props.data.questions} </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.jobs}>
                                 <TouchableOpacity   
                                    activeOpacity={0.1} style={{flex:1,flexDirection:'row-reverse',marginLeft:5}}
                                    onPress={() => this.handleClick(this.props.data,'jobs')} 
                                    >
                                        <View style={styles.circle}>
                                            <Text style={styles.number}> {this.props.data.jobs} </Text>
                                        </View>
                                        <Text style={styles.textBelow}>Jobs </Text>
                                 </TouchableOpacity>
                               </View>
                            </View>
                    }
                </TouchableOpacity>
            </ImageBackground>
        </View>
        );
        }
    }

const styles = StyleSheet.create({
    textBelow : {
        fontSize: wp('3.75%'), 
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
        fontSize: 11,
        color: 'gray'
    },
    jobs: { 
        marginLeft: 5,
        marginBottom:5,
        alignSelf: 'flex-end',
        //flexDirection:'row',
        flex:1,
        //backgroundColor:'blue'
    },
    questions: { 
        marginLeft: 5,
        marginBottom:5,
        alignSelf: 'flex-end',
        flexDirection:'row',
        flex:1,
        //backgroundColor:'gray'
    },
    specialQuestions: {
        marginLeft: 5,
        marginBottom:5,
        alignSelf: 'flex-end',
        flexDirection:'row-reverse',
        flex:1,
    },
    paragraph: {
        margin: 10,
        fontSize: wp('3.75%'),
        fontWeight: 'bold',
        justifyContent:'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'   
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
    container: {                          
        flex:4,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:'red'
    },
    imageContainer: {
        flex: 1,  
        borderRadius: 10,                        // take up all available space
        height: height*0.14,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
      },
    });





import React from 'react';
import {ImageBackground,Dimensions, StyleSheet, 
        TouchableOpacity, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 3;

var randomImg = [
    require('../images/1.jpg'), require('../images/2.jpg'),    
    require('../images/3.jpg'), require('../images/4.jpg'), 
    require('../images/5.jpg'), require('../images/6.jpg'),     
    require('../images/7.jpg'), require('../images/8.jpg'),    
    require('../images/9.jpg'), require('../images/10.jpg'),
    require('../images/11.jpg'), require('../images/12.jpg'),    
    require('../images/13.jpg'), require('../images/14.jpg'), 
    require('../images/15.jpg'), require('../images/16.jpg'),     
    require('../images/17.jpg'), require('../images/18.jpg'),    
    require('../images/19.jpg'), require('../images/20.jpg'),
    require('../images/21.jpg'), require('../images/22.jpg')];  

export default class Cards extends React.Component {

    constructor(props){
        super(props);
    }
  
    //get the occupation for the card clicked
    handleClick = (job) => {
       this.props.clickedJob(job.occupation);
    }

    render() {    
        return (
            <ImageBackground source={ randomImg[Math.floor(Math.random()*randomImg.length)]} 
            style={[styles.shadow,styles.imageContainer]}
            imageStyle={{ borderRadius: 10}}
           >
                <TouchableOpacity activeOpacity={0.1} style={{flex:1}}
                    onPress={() => this.handleClick(this.props.jobName)} 
                    >
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            {this.props.jobName.occupation}
                        </Text>
                    </View>
                    <View style={styles.questions}>
                        <Text style={styles.textBelow}>Jobs </Text>
                        <View style={styles.circle}>
                            <Text style={styles.number}> {this.props.jobName.jobs} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            );
        }
    }

const styles = StyleSheet.create({
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
        fontSize: 11,
        color: 'gray'
    },
    questions: { 
        alignItems:'center',
        marginRight: 5,
        alignSelf: 'flex-end',
        flexDirection:'row',
        //marginBottom:2,
        flex:1,
    },
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
        borderRadius: 10                        // take up all available space
    },
    image: {
        borderRadius: 5,                 // rounded corners
        //...StyleSheet.absoluteFillObject, // fill up all space in a container
        flex:1,
        resizeMode:'contain',
    },
    });





import React from 'react';
import {ImageBackground,Dimensions, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 3;

var randomImg = [
    require('../images/Cinnamint.jpg'), require('../images/EasyMed.jpg'),    
    require('../images/EndlessRiver.jpg'), require('../images/GreenandBlue.jpg'), 
    require('../images/LemonTwist.jpg'), require('../images/Limeade.jpg'),     
    require('../images/Mild.jpg'), require('../images/Mojito.jpg'),    
    require('../images/NeonLife.jpg'), require('../images/Ohhappiness.jpg'),
    require('../images/PacificDream.jpg'), require('../images/Quepal.jpg'),    
    require('../images/SummerDog.jpg'),require('../images/TealLove.jpg'),    
    require('../images/UnderLake.jpg'), require('../images/Vine.jpg')];  

export default class Cards extends React.Component {

    constructor(props){
        super(props);
    }
  
    handleClick = (job) => {
       this.props.clickedJob(job);
    }

    render() {    
        return (
            <ImageBackground source={ randomImg[Math.floor(Math.random()*randomImg.length)]} 
            style={[styles.about,styles.shadow,styles.imageContainer]}
            imageStyle={{ borderRadius: 10}}>
                <TouchableOpacity activeOpacity={0.1} style={{flex:1}}
                    onPress={() => this.handleClick(this.props.jobName)} 
                    >
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            {this.props.jobName}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
            );
        }
    }

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
        flex:1,
        justifyContent: "center",
        alignItems: "center"
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





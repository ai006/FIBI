import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 2, rows = 3;

export default class Cards extends React.Component {

    constructor(props){
        super(props);
    }
  
    handleClick = (job) => {
       this.props.clickedJob(job);
    }

    render() {
        var rgb_1_1 = Math.floor(Math.random() * 256) + 128
        var rgb_2_1 = Math.floor(Math.random() * 256) 

        return (
            <LinearGradient
                colors={[`rgb(255,255,240)`, 
                        `rgb(${rgb_1_1},255,${rgb_1_1})`,
                        `rgb(${rgb_2_1}, 255 ,${rgb_2_1})`,
                        ]}
                start={[0.15,0.15]}
                end={[0.9,0.9]}
                style={[styles.about,styles.shadow,styles.imageContainer]}>
                <TouchableOpacity activeOpacity={0.1} style={{flex:1}}
                    onPress={() => this.handleClick(this.props.jobName)} 
                    >
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            {this.props.jobName}
                        </Text>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
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
        color:'#005500',    //color of the text for the job hiring
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,   
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

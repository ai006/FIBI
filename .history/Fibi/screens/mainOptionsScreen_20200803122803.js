import React from 'react';
import {Dimensions, StyleSheet,Platform,TouchableOpacity, 
        Text,Image, View,ScrollView,ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Cards from '../cards/mainOptionsCard';
import UniqueCard from '../cards/uniqueOptionsCard';
import CardModal from '../modals/optionCardModal';
import DescritionModal from '../modals/descriptionModal';


// Get screen dimensions
const { width, height } = Dimensions.get('window');

// How many posters we want to have in each row and column
const numColumns = 2;

//used for getting ket for FlatList
const extractKey = ({ id }) => id.toString()

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push(  { id: numberOfElementsLastRow,
                  occupation: `blank-${numberOfElementsLastRow}`,
                  questions: '0',
                  jobs: '0', 
                  empty:      true });
    numberOfElementsLastRow++;
  }

  return data;
};


class MainOptionsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerLeft:  () =>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image
                      source={require('../images/logo_small.jpg')}
                      style={{width:40, height:40, flex:1}}
                      resizeMode="contain"
                  />
              </View>
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
          headerTitle: () => null,
        };
      };

    constructor(props){
      super(props);
      this.state = {
        searching : false,  //boolean to switching the loading screen indicator on and off
        showModalData:false,  //boolean used to determine when to show the job Modal
        showdescriptionModal:false,
        title:'The FIBI home Screen',
        description:'on this page, you will be able to access Jobs in the different departements and also see some questions that may help you in your job search',
        ModalData : {}
      }
    }

    //function to used in sorting the types of jobs in alphabetical order
    compare = (a, b) => {
      // Use toUpperCase() to ignore character casing
      const nameA = a.occupation.toUpperCase();
      const nameB = b.occupation.toUpperCase();
    
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }

  //function to get the selected type of job and search through 
  //the redux for the companies that hire for that job
  jobclicked = (job) => {
    this.cardClosed();
    const {data} = this.props;
    var results = [];
    for (var i = 0; i < data.length; i++) {
      for(var j = 0; j < data[i].jobsArr.length; j++){
        
        if (data[i].jobsArr[j] === job) {
              results.push(data[i]);
          }
      }
    }
    this.props.navigation.navigate('JobsData', {jobs: results});
  }

  //function to get the selected type of occupation and search through 
  //the redux for the questions in that category
  openQuestions = (category) => {
    this.cardClosed();
    //send all the questions to the Furum Screen and the category selected
    this.props.navigation.push('Forum', { 
                                          //questions:results,  //array containing all the selected category
                                          option : category   //name of the category selected
                                        }
    );
  }

  //fuction used to open an enlarged screen of the card
  cardClicked = (news) => {
    this.setState({
      showModalData:true,
      ModalData: news
    })
  }

  //fuction used to close the enlarge screen of the card
  cardClosed = () => {
    this.setState({
      showModalData:false,
      ModalData: {}
    })
  }
  descriptionModalClosed = () => {
    this.setState({
      showdescriptionModal:false
      
     
    });
    console.log('am here');
    AsyncStorage.setItem('jobsscree', JSON.stringify(false));
  }

  descriptionModalreopen = () => {
    this.setState({
      showdescriptionModal:false
    });
    
  }

  /*fuction used to hnadle the users choice
  the function closes the modal and either 
  opens jobs or question depending on what the user chose*/
  modalHandler = (data,type) => {
    this.setState({
      showModalData:false,
      ModalData: {}
    })
    if(type === 'job'){   //if jobs is selected
      this.jobclicked(data)
    }
    else if(type === 'question'){ //if questions selected
      this.openQuestions(data)
    }
  }



  //The function being used by flatList to display the cards
  renderItem = ({ item }) => {
    return (
      <View style={{margin:5,flex:1}}>
        <Cards data={item} clickedJob={this.jobclicked}
               clickedForum={this.openQuestions}
               openModal={this.cardClicked}/>
      </View>
      
    )
  }
  componentDidMount() {

  AsyncStorage.getItem('jobsscree').then((value) => {
    let thevalue = JSON.parse(value);

    if (thevalue != null){
      console.log(thevalue);
      this.setState({ showdescriptionModal: thevalue});
    }
  else{
    this.setState({ showdescriptionModal: true});
  }
    
  });
  }
  render() {

    const {jobTypes}  = this.props;         //get the types of jobs in our redux store and display
    const {title, description} = this.state;
    //get all the unique options to display on top for 
    //the horizantal scroll
    var unique = [];
    for (var i = 0; i < jobTypes.length; i++) {
        if (jobTypes[i].special === true) {
          unique.push(jobTypes[i]);
          }
    }
    jobTypes.sort(this.compare) //sort all the types of jobs in alphabetical order before displaying them
    return (
      <View style = {styles.background}>
        {this.state.searching ? 
          <View style={{justifyContent:'center', marginTop: 10}}>
            <ActivityIndicator size="large" color="#2ae815" />
          </View> 
          :
           null 
        }
       
        <View style={{flex:1,borderBottomColor:'#DCDCDC',borderBottomWidth:1
                      ,backgroundColor:'#F5F5F5'}}>
           
          <ScrollView contentContainerStyle={styles.scrollContent} 
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      style={{flex:1}}
                      >
              { unique.map((options,index) =>  
                    <View style={{alignItems:'center',justifyContent:'center',
                          marginHorizontal:5}} key={index}>
                      <UniqueCard option={options.occupation}
                                  emoji={options.emoji}
                                  handleClick={this.openQuestions}/>
                    </View>
              )}
          </ScrollView>
        </View>
        <View style={{backgroundColor:'white',flex:4,marginTop:10}}>
          <FlatList
            data={formatData(jobTypes, numColumns)}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
            numColumns={numColumns}/>
        </View>
        <CardModal show={this.state.showModalData} data={this.state.ModalData} handleClick={this.cardClosed}
                    handleModal={this.modalHandler}/>
         <DescritionModal clicker={this.state.showdescriptionModal} title={title} description ={description} onclick ={this.descriptionModalClosed} reopen={this.descriptionModalreopen}/>
         
      </View>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    data:  state.data.jobs,      //array of jobs
    questions: state.forum.forum, //array of all questions in forum 
    jobTypes: state.jobType.jobTypes, //array of the type of jobs
    status: state.data.error,    //string of error message if an error occurs during fetch
    pending: state.data.pending, //boolean true during fetching of API data and false before and after fetching  
  };
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  content:{
    flex:1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
   // height: Dimensions.get('window').width / numColumns, // approximate a square
  },
});

export default connect(mapStateToProps,null)(MainOptionsScreen);
import React from 'react';
import {TextInput, Dimensions, StyleSheet,Platform,
        Text, View,ScrollView,TouchableOpacity,Image,
        FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import NewsCard from '../../cards/newsCard';
import ModalComponent from './newsModal';
import DescriptionModal from '../../modals/descriptionModal';

const { width, height } = Dimensions.get('window');

//used for getting ket for FlatList
const extractKey = ({ _id }) => _id.toString()

class NewsOptionsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:  () =>
      <View style={{flex:1, flexDirection:'row'}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
              source={require('../../images/logo_small.jpg')}
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
    </View>,
      headerTitle: () => null,
    };
  };

constructor(props){
  super(props);
  this.state = {
      showModalData: false,
      title:'On going news',
      description:'on this page, you be updated with the latest news about International Students',
      ModalData : {},
      showdescriptionModal: false
  }
}

//function used to open the news Modal
newsClicked = (news) => {
    this.setState({
      showModalData:true,
      ModalData: news
    })
}

//function used to  close the news Modal
newsClosed = () => {
  this.setState({
    showModalData:false,
    ModalData: {}
  })
}


//The function being used by flatList to display the cards
renderItem = ({ item }) => {
  return (
    
    <View>
      <NewsCard handleClick={this.newsClicked} headlines={item}/>
    </View>
  )
}
descriptionModalClosed = () => {
  this.setState({
    showdescriptionModal:false
    
   
  });
 
  AsyncStorage.setItem('newsscreen', JSON.stringify(false));
}

descriptionModalreopen = () => {
  this.setState({
    showdescriptionModal:false
  });
  
}
componentDidMount() {

  AsyncStorage.getItem('newsscreen').then((value) => {
    let thevalue = JSON.parse(value);

    if (thevalue != null){
     
      this.setState({ showdescriptionModal: thevalue});
    }
  else{
    this.setState({ showdescriptionModal: true});
  }
    
  });
}

render() { 
  const {title, description} = this.state; 
  const {news}  = this.props; //get the news object to display
  var msg = 'unfortunately we have no news shows at the moment but if you have read something share it with us😁😁😁'
    if(news.length === 0){
      return(
        <View style={{backgroundColor:'#fcfcfc',padding:20, borderRadius:20,marginHorizontal:10}}>
          <Text style={{fontSize:19}}>{msg}</Text>
        </View>
      )
    }
    const reverse  = news.reverse()
    return (
          <View style={{flex:1}}>
            <View style={styles.container}>
              <FlatList 
                data = {reverse}
                renderItem={this.renderItem}
                keyExtractor={extractKey}
               />
            </View>
            <ModalComponent show={this.state.showModalData} article={this.state.ModalData} handleClick={this.newsClosed}/>
            <DescriptionModal clicker={this.state.showdescriptionModal} title={title} description ={description} onclick ={this.descriptionModalClosed} reopen={this.descriptionModalreopen}/>
          </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.articles.news,
    status: state.forum.error,    //string of error message if an error occurs during fetch
    pending: state.forum.pending, //boolean true during fetching of API data and false before and after fetching  
  };
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor:'#fcfcfc'
  },
  
});

export default connect(mapStateToProps,null)(NewsOptionsScreen);
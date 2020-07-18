import React from 'react';
import {TextInput, Dimensions, StyleSheet,Platform,
        Text, View,ScrollView,TouchableOpacity,Image } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import NewsCard from '../../cards/newsCard';
import ModalComponent from './newsModal';


const { width, height } = Dimensions.get('window');

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
      ModalData : {}
  }
}

newsClicked = (news) => {
    this.setState({
      showModalData:true,
      ModalData: news
    })
}

newsClosed = () => {
  this.setState({
    showModalData:false,
    ModalData: {}
  })
}


render() {  
  const {news}  = this.props; 
  //console.log(news)
    return (
          <View style={{flex:1}}>
            <View style={styles.container}>
              <ScrollView>
                {
                  news.map((article,index) =>
                  <View key={index}>
                    <NewsCard handleClick={this.newsClicked} headlines={article}/>
                  </View>
                  )
                }
                
              </ScrollView>
            </View>
            <ModalComponent show={this.state.showModalData} article={this.state.ModalData} handleClick={this.newsClosed}/>
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
    backgroundColor:'white'
  },
  
});

export default connect(mapStateToProps,null)(NewsOptionsScreen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';



class JobsData extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const {data,status,pending} = this.props;
    //console.log(data)
    if(!data) {
      return (
       <Text>No Data</Text>
      )
    }
    if(pending){
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
    }
    return (
      <View>
         <ScrollView  >
          {data.map(job => <View key={job.id}><Text> Name: {job.CompanyName}</Text></View>)}
        </ScrollView>
        {/* <View  style={styles.container}>
          <Text> error: { status }</Text>
       </View> */}
      </View> 
    );
  }
}

const mapStateToProps = state => {
  return {
    data:  state.data.jobs,
    status: state.data.error,
    pending: state.data.pending,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
export default connect(mapStateToProps,null)(JobsData);
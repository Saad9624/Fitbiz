import React from 'react';
import { StyleSheet, Text, View 
  ,Image,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity} from 'react-native';
import Constants from './../../color';

export default class otp extends React.Component {

    static navigationOptions ={
        header: null
    }

    state={
        exercise_name :''
    }


    render(){

    
  return (
    <View style={styles.container}>

                          
                         
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                        <Image  
                                        style={{marginTop:50 ,alignItems:'flex-end' , alignSelf:'flex-end' ,marginRight:20}}
                                        source={require('./../../assets/images/burger/burger.png')}>

                                        </Image>
                               </TouchableOpacity>

                            <Text style={styles.h1}>CHAIR SQUATS</Text>

                            <TouchableOpacity style={{backgroundColor:Constants.headingcolor ,borderRadius:10 ,
                                                    marginTop:5, height:50 , width:150 ,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                            
                                        <Text style={{color:'white',fontSize:15}}>START EXERCISE</Text>

                            </TouchableOpacity>

                            <ScrollView style={{marginRight:10,marginLeft:10,backgroundColor:'white',marginBottom:20 , height:'100%',marginTop:25}}>
                            
                                    <Text style={styles.h2}>EXERCISE DESCRIPTION :</Text>
                                    
                                      
                                                         <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                                                                                              
                                                                                                              sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                                                                              
                                                                                                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                                                                                              
                                                                                                              sunt in culpa qui officia deserunt mollit anim id est laborum
                                                        </Text>
                                            
                            
                            </ScrollView>


                     
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backgroundcolor,
  },
  h1:{
    color:Constants.headingcolor,
    fontSize:30,
    alignSelf:'center',
    fontWeight:'bold',
    marginTop:10 
  },
  h2:{
    color:'black',
    fontSize:23,
    fontWeight:'bold',
    margin:10
  },
  desc:{
      alignSelf:'center',
      fontSize:18 ,
      margin:10 ,

  }

});

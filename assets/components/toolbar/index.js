import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity,Platform} from 'react-native';
import logo from   './../../../assets/images/logo/logo-lg.png';
import burger from './../../../assets/images/burger/burger.png';
import Constants from './../../../color' ;
const Toolbar = props => {
  return props.title ? (
   <View style={{ backgroundColor: Constants.backgroundcolor}}>
     <View
          style={{
            height: Platform.OS === "ios" ? 18 : Expo.Constants.statusBarHeight,
            backgroundColor: "#FFFFFF",
          }}
        ></View>


    <View style={styles.container1}>
     
        <Image
          style={{width:37,height:22}}
          source={logo}
        />
    

      <Text style={{fontSize:18}}>{props.title}</Text>

      <TouchableOpacity
      onPress={() => props.navigation.openDrawer()}
        style={{flexDirection: 'row', marginTop: 3 }}>
        <Image style={{width: 20, height: 23}} source={burger} />
       
      </TouchableOpacity>
    </View>
    </View>
  ) : (
    <View style={{ backgroundColor: Constants.backgroundcolor}}>
         <View
          style={{
            height: Platform.OS === "ios" ? 18 : Expo.Constants.statusBarHeight,
            backgroundColor: "#FFFFFF",
          }}
        ></View>
 
    <View style={styles.container}>
      
            <Image
              style={{width:37,height:22}}
              source={logo}
            />
        

     

        <TouchableOpacity
        style={{marginHorizontal:10}}
          onPress={() => props.navigation.openDrawer()}
          style={{flexDirection: 'row', marginTop: 3}}>
          <Image style={{width: 20, height: 23}} source={burger} />
        
        </TouchableOpacity>
    </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },

  container1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
});

import React from "react";
import { Video } from "expo-av";
import { View, Text , WebView ,Platform} from "react-native";
import Toolbar from './../../assets/components/toolbar' 
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from './../../color' ;

class Videoclass extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state={
    videoLink:'https://www.youtube.com/embed/' ,
    videoID:'',
    ename:'',
    emuscle:'',
    WellnessExcerciseID:'',
    wellnessbreakid:''

  }

  componentDidMount(){
    const video = this.props.navigation.state.params.video;
    const name = this.props.navigation.state.params.name;
    const muscle = this.props.navigation.state.params.muscle;
    const WellnessExcerciseID = this.props.navigation.state.params.WellnessExcerciseID;
    const wellnessbreakid = this.props.navigation.state.params.wellnessbreakid;
    setTimeout(() => {
      console.log("video" , video)
      console.log("videoIdSeparted" , video.substring(17)) ;
      this.setState({
        videoID:this.state.videoLink + video.substring(17) ,
        ename:name ,
        emuscle:muscle,
        WellnessExcerciseID:WellnessExcerciseID,
        wellnessbreakid:wellnessbreakid
  
      })
    }, 3000);
   
  }


  onReady =async()=>{
    
  }
  render() {
    return (
    
      <View style={{flex:1}}>
        {this.state.videoID === "" ? 
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>Loading Video...</Text>

        </View>
        :
        <View style={{flex:1}}>
          <View
          style={{
            height: Platform.OS === "ios" ? 18 : Expo.Constants.statusBarHeight,
            backgroundColor: "#FFFFFF",
          }}
        ></View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            height:60 ,backgroundColor:colors.backgroundcolor}}>
            <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
              style={{marginHorizontal:10}}>
                  <Text>Go back</Text>
            </TouchableOpacity>
            

            <TouchableOpacity
              style={{marginHorizontal:10}}
              onPress={() => this.props.navigation.navigate('Timer',{
                name:this.state.ename , 
                muscle:this.state.emuscle ,
                WellnessExcerciseID:this.state.WellnessExcerciseID ,
                wellnessbreakid:this.state.wellnessbreakid
              })}>
              <Text>Skip Video</Text>
            </TouchableOpacity>
        </View>
        
         {/* <Toolbar navigation={this.props.navigation}></Toolbar> */}
      <WebView
        style={{width: '100%', height: '90%' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      
    //  source={{uri :"https://youtu.be/OViE2ghEop0"}}
       source={{ uri: this.state.videoID }}
      />
        </View>
        
      }
         

       
        {/* <YouTube
        apiKey=""
          videoId="OViE2ghEop0" // The YouTube video ID
          play // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 300 }}
        /> */}
              </View>
    );
  }
}

export default Videoclass;

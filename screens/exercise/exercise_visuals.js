import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "./../../color";
import Loading from "react-native-whc-loading";
import { FITBIZ_REST_API_URLS } from "../utils/https";
import { fitbizfetcher } from "../utils/FitBizFetcher";
import Toolbar from './../../assets/components/toolbar' ;

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    exercise_name: "EXERCISE",
    visual_add: "",
    visual_video: "",
    ID: "",
    VIDEO:'',
    muscle:'loading..' ,
    WellnessExcerciseID:'' ,
    wellnessbreakid:''
  };

  componentDidMount() {
    this.refs.loading.show();
    const id = this.props.navigation.state.params.id;
    const WID = this.props.navigation.state.params.WellnessExcerciseID;
    const wellnessbreakid = this.props.navigation.state.params.WELLNESSBREAKID;
    this.setState({

      ID: id,
      WellnessExcerciseID:WID ,
      wellnessbreakid:wellnessbreakid
    });
    setTimeout(() => {
      this.getExercise("Naveed", "pass", id);
    }, 3000);
  }

  getExercise = async (name, password, id) => {
    this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.exercise_details +
        `username=${name}&password=${password}&exerciseID=${id}`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      this.refs.loading.close();
      const res = response.json;
      this.setState({
        description: res.Description,
        exercise_name: res.Name,
        visual_add: res.VisualAid,
        VIDEO :res.VideoLink ,
        muscle:res.MuscleGroup ,
      });
     // console.log("response", res);
    } catch (error) {
      this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };

  render() {
    
    return (
      <View style={styles.container}>

<Toolbar title="Exercise Visuals" navigation={this.props.navigation}></Toolbar>


        {/* <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Image
            style={{
              marginTop: 50,
              alignItems: "flex-end",
              alignSelf: "flex-end",
              marginRight: 20,
            }}
            source={require("./../../assets/images/burger/burger.png")}
          ></Image>
        </TouchableOpacity> */}

        <Text style={styles.h1}>{this.state.exercise_name}</Text>
        <Text style={styles.h3}>({this.state.muscle})</Text>

        <Text style={styles.h2}>VISUAL AID:</Text>
        {/* <Image
            style={{ alignSelf: "center", marginTop: 20 }}
            source={require("./../../assets/images/visual/visual.png")}
          ></Image> */}

        {this.state.visual_add === "" || this.state.visual_add === null ? (
          <Text style={{alignSelf:'center'}}>Loading Visual aid...</Text>
        ) : (
          // <Image
          //   style={{ alignSelf: "center", marginTop: 20 }}
          //   source={{ uri: this.state.visual_add }}
          // ></Image>
          <View style={{borderWidth:0.5,borderColor:'black',marginHorizontal:30,marginVertical:5}}>
                <Image style={{ alignSelf: "center", marginTop: 20,width: 200,marginVertical:10,
          height: 150,
          resizeMode: 'contain' }}
          source={{uri: `data:image/png;base64,${this.state.visual_add}`}}
          //  source={{uri : this.state.visual_add}} 
          //source={{uri: `data:image/png;base64,${this.state.visual_add}`}} 
           />

          </View>
          
        )}

        <Text style={styles.h2}>VIDEO DEMONSTRATION:</Text>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Video", {
              WellnessExcerciseID: this.state.WellnessExcerciseID,
              video : this.state.VIDEO ,
              name:this.state.exercise_name , 
              muscle:this.state.muscle ,
              wellnessbreakid:this.state.wellnessbreakid
            })
          }
          style={styles.btn}
        >
          <Text style={{ fontSize: 18,color:'white' }}>EMBED VIDEO</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Timer", {
              Eid: this.state.ID,
              name: this.state.exercise_name
            })
          }
          style={styles.btn}
        >
          <Text style={{ fontSize: 18 }}>Skip and upload</Text>
        </TouchableOpacity> */}

        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    color: 'black',
    fontSize: 30,
    alignSelf: "center",
    marginTop: 10,
  },
  h3: {
    color: 'black',
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  h2: {
    color: "black",
    fontSize: 20,
    alignSelf:'center',
    marginTop: 25,
  },
  embedvide: {
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 25,
  },
  desc: {
    alignSelf: "center",
    fontSize: 18,
    margin: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 140,
    alignSelf: "center",
    backgroundColor: "purple",
    marginTop: 15,
    borderRadius:5,
    marginVertical:10
  },
});

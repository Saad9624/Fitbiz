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
import { FITBIZ_REST_API_URLS } from "../utils/https";
import { fitbizfetcher } from "../utils/FitBizFetcher";
import Loading from "react-native-whc-loading";
import Toolbar from './../../assets/components/toolbar' ;

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    exercise_name: "Loading..",
    id: "",
    description: "",
    muscleSquad:'Loading..',

  };

  componentDidMount() {
    const id = this.props.navigation.state.params.id;
  
    setTimeout(() => {
      this.getExercise("Naveed", "pass", id);
    }, 3000);
  }

  getExercise = async (name, password, id) => {
    //this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.exercise_details +
        `username=${name}&password=${password}&exerciseID=${id}`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      //this.refs.loading.close();
      const res = response.json;
      this.setState({
        description: res.Description,
        exercise_name: res.Name,
        muscleSquad :res.MuscleGroup ,
      });
      console.log("response", res);
    } catch (error) {
      // this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };

  render() {
    const { description, exercise_name , muscleSquad } = this.state;
    return (
      <View style={styles.container}>
        <Toolbar title="Wellness Break History" navigation={this.props.navigation}></Toolbar>
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

        <TouchableOpacity
         // onPress={() => this.props.navigation.navigate("EXERCISE_VISUALS")}
        >
          <Text style={styles.h1}>{exercise_name}</Text>
          <Text style={styles.h1}>({muscleSquad})</Text>
        </TouchableOpacity>

        <ScrollView
          style={{
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: "white",
            height: "100%",
            marginTop: 25,
          }}
        >
          <Text style={styles.h2}>Exercise Description:</Text>

          <Text style={styles.desc}>{description}</Text>
        </ScrollView>
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
    fontWeight: "bold",
    marginTop: 10,
  },
  h1: {
    color: Constants.headingcolor,
    fontSize: 20,
    alignSelf: "center",
  },
  h2: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  desc: {
    alignSelf: "center",
    fontSize: 15,
    margin: 10,
  },
});

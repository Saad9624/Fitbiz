import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../color";
import Constants from "../color";
import Loading from "react-native-whc-loading";
import { FITBIZ_REST_API_URLS } from "./utils/https";
import { fitbizfetcher } from "./utils/FitBizFetcher";

const users = [
  {
    key: "5a31077f6dda99e234ad6727",
    name: "CHEST PRESS",
  },
  {
    key: "5a31077fcbee1cf54eed6c61",
    name: "CURLS",
  },
  {
    key: "5a31077fcb4a048c957901e4",
    name: "DIPS",
  },
  {
    key: "5a31077f8234793502990437",
    name: "GLUTE KICK-BACKS",
  },

  {
    key: "5a31077f6dda99e234ad6727",
    name: "KARATE KICKERS",
  },
  {
    key: "5a31077fcbee1cf54eed6c61",
    name: "LUMBERJACKS",
  },
  {
    key: "5a31077fcb4a048c957901e4",
    name: "JUMPING JACKS",
  },
  {
    key: "5a31077f8234793502990437",
    name: "OBLIGUE SIDE BEND",
  },
  {
    key: "5a31077f8234793502990437",
    name: "PUPPET MARCHES",
  },

  {
    key: "5a31077f6dda99e234ad6727",
    name: "PUSH-UPS",
  },
  {
    key: "5a31077fcbee1cf54eed6c61",
    name: "SCISSOR JUMPS",
  },
  {
    key: "5a31077fcb4a048c957901e4",
    name: "SEATED AB FLEX ES",
  },
  {
    key: "5a31077f8234793502990437",
    name: "SHOULDER PRESS",
  },
  {
    key: "5a31077fcbee1cf54eed6c61",
    name: "SKI JUMPS",
  },
  {
    key: "5a31077fcb4a048c957901e4",
    name: "SQUATS",
  },
  {
    key: "5a31077f8234793502990437",
    name: "SQUATS +  LATERAL EXTENSION",
  },
];

export default class otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.getExercise("Naveed", "pass", 4);
    console.log("dir");
  }

  getExercise = async (name, password, id) => {
    this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.wellness_break +
        `username=${name}&password=${password}&wellnessBreakID=${id}`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      this.refs.loading.close();
      const res = response.json.WellnessExcerciseItemList;

      this.setState({
        exercise: res,
      });

      console.log("response", response.json);
    } catch (error) {
      this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Image
            style={{
              marginTop: 50,
              alignItems: "flex-end",
              alignSelf: "flex-end",
              marginRight: 20,
            }}
            source={require("./../assets/images/burger/burger.png")}
          ></Image>
        </TouchableOpacity>

        <Text style={styles.h1}>EXERCISE LIBRARY</Text>
        <FlatList
          style={{ marginTop: 25, marginBottom: 25 }}
          keyExtractor={(item, index) => index}
          data={this.state.exercise}
          renderItem={({ item }) => (
            <View
              style={{
                marginRight: 20,
                marginLeft: 20,
                padding: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("EXERCISE_DESCRIPTION", {
                    id: item.ExerciseID,
                  })
                }
              >
                <Text
                  style={{
                    color: "blue",
                    fontSize: 25,
                    textDecorationLine: "underline",
                    fontWeight: "700",
                  }}
                >
                  {item.ExcerciseName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("EXERCISE_VISUALS", {
                    id: item.ExerciseID,
                  })
                }
                style={styles.start}
              >
                <Text
                  style={{
                    textDecorationLine: "underline",
                    padding: 5,
                    color: "white",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backgroundcolor,
  },
  h1: {
    color: Constants.headingcolor,
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  start: {
    backgroundColor: "green",
    width: 100,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WEELNESS_DETAIL")}
        >
          <Image
            style={{ alignSelf: "center", marginTop: 50, marginBottom: 20 }}
            source={require("./../assets/images/logo/logo-lg.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WELNESS_BREAK")}
        >
          <Text style={styles.h1}>Wellness break History</Text>
        </TouchableOpacity>

        <View opacity={0.3} style={styles.line}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("EXERCISE_VISUALS")}
        >
          <Text style={styles.h1}>My Achievements</Text>
        </TouchableOpacity>
        <View opacity={0.3} style={styles.line}></View>

        <Text style={styles.h1}>My Rewards</Text>
        <View opacity={0.3} style={styles.line}></View>

        <Text style={styles.h1}>Leaderboard</Text>
        <View opacity={0.3} style={styles.line}></View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HOME")}
        >
          <Text style={styles.h1}>Exercise Library</Text>
        </TouchableOpacity>
        <View opacity={0.3} style={styles.line}></View>

        <Text style={styles.h1}>Reward Bank</Text>
        <View opacity={0.3} style={styles.line}></View>

        <Text style={styles.h1}>Challenge</Text>
        <View opacity={0.3} style={styles.line}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LOGIN")}
        >
          <Text style={styles.h1}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  v1: {
    marginTop: 20,
    borderColor: "#d3d3d3",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    height: 70,
    width: "100%",
    alignSelf: "center",
  },
  t3: {
    marginTop: 40,
    fontSize: 10,
    fontWeight: "200",
  },
  line: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  h1: {
    fontSize: 18,
    margin: 8,
    marginLeft: 20,
  },
});

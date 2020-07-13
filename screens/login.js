import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Loading from "react-native-whc-loading";

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: "",
    password: "",
  };

  checkifempty = () => {
    this.refs.loading2.show();

    //this.props.navigation.navigate("HOME");

    if (this.state.username != "" && this.state.password != "") {
      this.login(this.state.username, this.state.password);
    } else {
      this.refs.loading2.close();
      alert("Please enter Username/Password");
    }
  };

  handleusername = (newText) => this.setState({ username: newText });
  handlepassword = (newText) => this.setState({ password: newText });

  login_call(name, pass) {
    const baseUrl =
      "http://fitbitzapi-env.4zm2regmgg.us-east-1.elasticbeanstalk.com/api/Auth?";
    const param = `username=${name}&password=${pass}`;
    return `${baseUrl}${param}`;
  }

  login = async (username, password) => {
    // this.props.navigation.navigate('HOME')

    try {
      const url = this.login_call(username, password);
      console.log(url);

      let response = await fetch(url);
      const completeresponse = await response.json();
      console.log("response ", completeresponse);
      this.refs.loading2.close();
    //  this.props.navigation.navigate("WEELNESS_DETAIL");
      if (completeresponse.ErrorCode === 0) {
        await AsyncStorage.setItem('userid' , JSON.stringify(completeresponse.UserID));
        // await AsyncStorage.setItem(
        //   "userObj",
        //   JSON.stringify(response.json.userdetails)
        // ); 
        this.refs.loading2.close();
        this.props.navigation.replace("WELNESS_BREAK");
        
      } 
      else {
        this.refs.loading2.close();

        alert("User not found");
      }
    } catch (e) {
      this.refs.loading2.close();
      alert("Something went wrong!");
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ alignSelf: "center" }}
          source={require("./../assets/images/logo/logo-lg.png")}
        ></Image>

        <View style={styles.view1}>
          <Image
            style={{ marginLeft: 20 }}
            source={require("./../assets/images/username/userico.png")}
          ></Image>
          <TextInput
            onChangeText={this.handleusername}
            style={{ marginLeft: 10 }}
            placeholder="username"
          ></TextInput>
        </View>

        <View style={styles.view1}>
          <Image
            style={{ marginLeft: 20 }}
            source={require("./../assets/images/password/pass.png")}
          ></Image>

          <TextInput
            onChangeText={this.handlepassword}
            style={{ marginLeft: 10 }}
            placeholder="password"
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => this.checkifempty()}
          style={styles.btn}
        >
          <Image></Image>

          <Text style={styles.signin}>SIGN IN</Text>
        </TouchableOpacity>
        <Loading ref="loading2" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

    justifyContent: "center",
  },
  view1: {
    alignSelf: "center",
    borderColor: "grey",
    height: 60,
    width: (Dimensions.get("window").width / 100) * 80,
    borderWidth: 1,
    borderRadius: 60,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  btn: {
    alignSelf: "center",
    borderColor: "grey",
    height: 60,
    width: (Dimensions.get("window").width / 100) * 80,
    borderWidth: 1,
    borderRadius: 60,
    marginTop: 30,
    justifyContent: "center",
    backgroundColor: "purple",
  },
  signin: {
    color: "white",
    alignSelf: "center",
  },
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from "react-native";
import Constants from "../../color";
import CountDown from "react-native-countdown-component";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { FITBIZ_REST_API_URLS } from "../utils/https";
import { fitbizfetcher } from "../utils/FitBizFetcher";
import Loading from "react-native-whc-loading";
import { duration } from "moment";
import Toolbar from './../../assets/components/toolbar' 

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);
let timeValue = 0;

class Timer1 extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
      min: 0,
      sec: 0,
      msec: 0,
      duration: 1,
      WellnessExcerciseID: "",
      ename:'' ,
      userid:'',
      USERID:'' ,
      ename:'',
      emuscle:'' ,
      wellnessbreakid:''

    };
    this.lapArr = [];

    this.interval = null;

    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.getFormattedTime = this.getFormattedTime.bind(this);
  }
  


  async componentDidMount() {
    const userObj = await AsyncStorage.getItem('userid') ;
        const item = JSON.parse(userObj);
        console.log("user id with different" , item)
        this.setState({
          USERID: item
        })

    const uid = await AsyncStorage.getItem('userid');
    console.log("userid" , uid)


    const WellnessExcerciseID = this.props.navigation.state.params.WellnessExcerciseID;
    const wellnessbreakid = this.props.navigation.state.params.wellnessbreakid;

    const name = this.props.navigation.state.params.name;
    this.setState({
      WellnessExcerciseID: WellnessExcerciseID,
      ename:name ,
      USERID:uid ,

      wellnessbreakid:wellnessbreakid

    });
    
    setTimeout(() => {
      const name = this.props.navigation.state.params.name;
      const muscle = this.props.navigation.state.params.muscle;
     this.setState({
        ename:name ,
        emuscle:muscle
  
      })
    }, 3000);

  }

  handleStart = () => {
    this.interval = setInterval(() => {
      if (this.state.msec !== 59) {
        this.setState({
          msec: this.state.msec + 1,
        });
      } else if (this.state.sec !== 59) {
        this.setState({
          msec: 0,
          sec: ++this.state.sec,
        });
      } else {
        this.setState({
          msec: 0,
          sec: 0,
          min: ++this.state.min,
        });
      }
    }, 1);
  };

  //   handlestop = () => {
  //     console.log("handleStop");
  //     clearInterval(this.interval);
  //   };

  //   handleReset = () => {
  //     this.setState({
  //       min: 0,
  //       sec: 0,
  //       msec: 0,

  //       start: false,
  //     });

  //     clearInterval(this.interval);

  //     this.lapArr = [];
  //   };

  updateDuration = async (name, password, id) => {
    this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.SubmitExerciseDuration +
        `username=${name}&password=${password}&wellnessExcerciseID=${this.state.WellnessExcerciseID}&userID=${this.state.USERID}`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      this.refs.loading.close();
        const res = response.json;
        console.log("response" , res) ;
        if(res.Success === true){

          this.props.navigation.navigate("AfterSubmittingExercise", {
            id: this.state.wellnessbreakid,
          });
        }
        else{
          alert("Something went wrong!")
        }


      //   this.setState({
      //     exercise: res,
      //   });

      console.log("response", response.json);
    } catch (error) {
      this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };

  toggleTimer() {
    this.setState({ timerStart: !this.state.timerStart, timerReset: false });
  }

  resetTimer() {
    this.setState({ timerStart: false, timerReset: true });
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }

  resetStopwatch() {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  }

  getFormattedTime = (time) => {
    this.currentTime = time;

    // this.setState({
    //   duration: time,
    // });
    // console.log()
    // // this.setTime(time);
    // timeValue = time;
    // console.log("time", this.timeValue);
    // console.log("time", timeValue);
  };

  setTime = (time) => {
    this.setState({
      duration: time,
    });
  };

  render() {
    return (
      <View>
         <Toolbar navigation={this.props.navigation}></Toolbar>
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
        <Text style={styles.title}>{this.state.ename}</Text>
        <Text style={styles.titlemuscle}>{this.state.emuscle}</Text>
        <View style={{ alignSelf: "center", marginVertical: 50 }}>
          <Stopwatch
            laps
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            // getTime={(time) => this.getTime(time)}
            getTime={this.getFormattedTime}
            handleFinish={this.handleFinish}
          />
        </View>

        <View style={styles.v1}>
          <TouchableOpacity onPress={this.toggleStopwatch} style={styles.oval}>
            <Text style={{ color: "white" }}>
              {" "}
              {!this.state.stopwatchStart ? "Start" : "Stop"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.resetStopwatch}
            style={[styles.oval, { backgroundColor: "red" }]}
          >
            <Text style={{ color: "white" }}>Reset </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.updateDuration("Naveed", "pass", this.state.EID)}
          style={styles.btn}
        >
          <Text style={{color:'white'}}>SUBMIT</Text>
        </TouchableOpacity>

        {/* <View style={styles.parent}>
          <Text style={styles.child}>
            {"  " + padToTwo(this.state.min) + " : "}
          </Text>
          <Text style={styles.child}>{padToTwo(this.state.sec) + " : "}</Text>
          <Text style={styles.child}>{padToTwo(this.state.msec)}</Text>
        </View> */}

        {/* <View style={styles.buttonParent}>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleStart}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlestop}>
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.handleLap(this.state.min, this.state.sec, this.state.msec)
            }
            // disabled={!this.state.start}
          >
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
        </View> */}

        <Loading ref="loading" />
      </View>
    );
  }
}

export default Timer1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.backgroundcolor,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 10,
  },
  titlemuscle: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 5,
  },
  v1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  oval: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scaleX: 2 }],
    marginVertical: 10,
  },
  btn: {
    alignItems: "center",
    backgroundColor:'purple',
    width: 150,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    marginTop:80
  },
  container: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: 7,
  },
  parent: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 80,
    borderColor: "#694966",
    backgroundColor: "#694966",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: ".5%",
    paddingBottom: ".5%",
    maxWidth: "63%",
  },

  child: {
    fontSize: 36,
    color: "#C89933",
  },

  buttonParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "12%",
    marginBottom: "16%",
  },

  button: {
    backgroundColor: "#694966",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#694966",
    height: 60,
  },

  buttonText: {
    color: "#C89933",
    fontSize: 20,
    alignSelf: "center",
  },
});

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
import Constants from "../../color";
import moment from "moment";
import { FITBIZ_REST_API_URLS } from "../utils/https";
import { fitbizfetcher } from "../utils/FitBizFetcher";
import Loading from "react-native-whc-loading";
import Check from "./../../assets/images/check/check.png";
import Uncheck from './../../assets/images/uncheck/uncheck.png'
import Approved from './../../assets/images/download.jpg'
import Toolbar from '../../assets/components/toolbar' ;

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    exercise_name: "",
    exercise: [],
    showCalendar: false,
    currentTime :0,
    ExerciseTime:0 ,
    showApproved: false
  };

  componentDidMount() {
    this.refs.loading.show();
   const id = this.props.navigation.state.params.id;
   const time = this.props.navigation.state.params.time;
    console.log("id", id   );
    console.log("time", time   );
    
    const today = new Date();
    this.setState({
      today: moment(today).format("LLL"),
  //   currentTime : moment(today).format('HH:mm:ss a') ,
      //ExerciseTime:moment(time).format('HH:mm:ss a') ,
    });
    setTimeout(() => {
      this.getExercise("Naveed", "pass", id);
    }, 3000);

   

    // var startTime = moment(today, "HH:mm:ss a");
    // var endTime = moment(time, "HH:mm:ss a");
    // console.log("this.state.currentTime" , this.state.currentTime);
    // console.log("this.state.ExerciseTime" , endTime);

    // calculate total duration

    // setTimeout(() => {
    //   var duration = moment.duration(this.state.currentTime.diff(this.state.ExerciseTime));
    //   var hours = parseInt(duration.asHours());
    //   console.log("differece--------", hours);
    // }, 5000);
    


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

      for(var i = 0  ; i <res.length ; i ++){
        if(res[i].Completed === true){
          this.setState({
            showApproved:true
          })
        }
        else{
          this.setState({
            showApproved:false
          })
        }
      }

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
    const { today } = this.state;
    return (
      <View style={styles.container}>

        <Toolbar title="Exercises" navigation={this.props.navigation}></Toolbar>

        {/* <View style={{justifyContent:'space-between',flexDirection:'row',marginHorizontal:20, marginTop: 50,}}>

           <Image style={{width:37,height:22}}
                                  source={require("./../../assets/images/logo/logo-lg.png")}
                                ></Image>

        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Image
            source={require("./../../assets/images/burger/burger.png")}
          ></Image>
        </TouchableOpacity>

        </View> */}
       

        <Text style={styles.h1}>{today}</Text>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 30,
            color: "black",
            fontWeight: "bold",
          }}
        >
          Task(s) :
        </Text>

        <FlatList
          style={{ marginTop: 25, marginBottom: 25 }}
          keyExtractor={(item, index) => index}
          data={this.state.exercise}
          renderItem={({ item }) => (
            <View>
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
                <View style={{flexDirection:'row',alignItems:'center'}}>
                {item.Completed === true ? 
                <Image source={Check}></Image>
                :

                <Image source={Uncheck}></Image>
                
                }
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("EXERCISE_DESCRIPTION", {
                      id: item.ExerciseID,
                    })
                  }
                >
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      marginHorizontal:10
                    }}
                  >
                    {item.ExcerciseDisplayName}
                  </Text>
                </TouchableOpacity>
                  </View>
               

                {item.Completed === true ? (
                  <View>
                    <Text></Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("EXERCISE_VISUALS", {
                        id: item.ExerciseID,
                        video:item.VideoLink ,
                      })
                    }
                    style={styles.start}
                  >
                    <Text
                      style={{
                        padding: 5,
                        color: "white",
                      }}
                    >
                      Start
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {item.Completed === true ? (
                <Text >
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    marginHorizontal: 30,
                  }}
                >
                  
                </Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

{this.state.showApproved && <Image source={Approved} style={{alignSelf:'center',resizeMode:'contain'}}></Image>}
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
    fontSize: 20,
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  h2: {
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
    margin: 10,
  },
  desc: {
    alignSelf: "center",
    fontSize: 18,
    margin: 10,
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

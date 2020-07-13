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
  AsyncStorage,
} from "react-native";
import Constants from "./../../color";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Check from "./../../assets/images/check/check.png";
import Uncheck from "./../../assets/images/uncheck/uncheck.png";
import { FITBIZ_REST_API_URLS } from "../utils/https";
import { fitbizfetcher } from "../utils/FitBizFetcher";

import Loading from "react-native-whc-loading";
import moment from "moment";
import CROSS from "./../../assets/images/cross/cross.png";
import CalendarPicker from "react-native-calendar-picker";

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
  }

  state = {
    exercise_name: "",
    image: Check,
    image1: Uncheck,
    WellnessBreak: [],
    today: "",
    showCalendar: false,
    selectedStartDate: null,
    selectedStartDate: null,
    selectedDate: "Today",
    maxDate: "",
    currentTimeStamp: 0,
  };

  changepic = () => {
    if (this.state.image === Check) {
      console.log("under if");
      this.setState({
        image: Uncheck,
      });
    } else if (this.state.image === Uncheck) {
      this.setState({
        image: Check,
      });
    }
  };
  changepic1 = () => {
    if (this.state.image1 === Check) {
      console.log("under if");
      this.setState({
        image1: Uncheck,
      });
    } else if (this.state.image1 === Uncheck) {
      console.log("underelse if");
      this.setState({
        image1: Check,
      });
    }
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      showCalendar: false,
    });

    console.log("date", moment(date).format("YYYY-MM-DD"));
    this.setState({
      selectedDate: moment(date).format("YYYY-MM-DD"),
    });

    this.getWllnessBreakDaybyDay(
      "Naveed",
      "pass",
      "1",
      moment(date).format("YYYY-MM-DD")
    );
  }

  async componentDidMount() {
    // const userObj = await AsyncStorage.getItem("userObj");
    // const item = JSON.parse(userObj);
    // console.log(item.user_id);
    const today = new Date();
    console.log("current timestamp", +new Date());
    this.setState({
      currentTimeStamp: +new Date(),
    });
    this.setState({
      today: moment(today).format('YYYY-MM-DD'),
    });

    var startDate = new Date();
    // Do your operations
    var endDate = new Date();
    console.log("endDate.getTime()", endDate.getTime());
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log("seconfs", seconds);

    const tomorrow = new Date(today);
    const newtom = tomorrow.setDate(tomorrow.getDate());
    const maxDate = new Date(newtom);
    this.setState({
      maxDate: maxDate,
    });

    // var startTime = moment("1:00:00 pm", "HH:mm:ss a");

    // // calculate total duration
    // var duration = moment.duration(endTime.diff(today));

    // // duration in hours
    // var hours = parseInt(duration.asHours());
    //  console.log("differece", hours);
    //this.getWllnessBreakDaybyDay("Naveed", "pass", "1", "2020-01-20");
  }

  getWllnessBreakDaybyDay = async (name, password, id, date) => {
    this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.GetWellnessBreaksByDay +
        `username=${name}&password=${password}&companyID=${id}&breakDate=2020-01-20`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      this.refs.loading.close();
       const completeresponse = await response.json();
 
      if(completeresponse.ErrorCode === 0){
 
      this.setState({
        WellnessBreak: completeresponse.WellnessBreakItemList,
      });
      }
      else{
        alert("No record found")
      }
   
      // console.log("response", res);
    } catch (error) {
      this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };

  showCal = () => {
    if (this.state.showCalendar === true) {
      this.setState({
        showCalendar: false,
      });
    } else {
      this.setState({
        showCalendar: true,
      });
    }
  };

  renderFlatList = () => {
    for (var i = 0; i < this.state.WellnessBreak.length; i++) {
      console.log(
        "under flatlist",
        this.state.WellnessBreak[i].BreakTimeDisplay
      );

      var endTime = moment(
        this.state.WellnessBreak[i].BreakTimeDisplay,
        "HH:mm:ss a"
      );
      var duration = moment.duration(endTime.diff(this.state.today));
      var hours = parseInt(duration.asHours());
      console.log("duration------------------------------------------", hours);
      // return this.state.WellnessBreak.map((data) => {
      //   var endTime = moment(data.BreakTimeDisplay, "HH:mm:ss a");
      //   var duration = moment.duration(endTime.diff(this.state.today));
      //   var hours = parseInt(duration.asHours());
      //   console.log("hours", hours);

      //   return (
      //     <TouchableOpacity
      //       onPress={() =>
      //         this.props.navigation.navigate("MORE_DETAIL", {
      //           id: data.id,
      //         })
      //       }
      //       style={{ flexDirection: "row", margin: 20 }}
      //     >
      //       {hours > 2 ? (
      //         <Image source={Uncheck}></Image>
      //       ) : (
      //         <Image source={CROSS}></Image>
      //       )}
      //       <Text>{data.BreakTimeDisplay}</Text>
      //     </TouchableOpacity>
      //   );
      // });
    }

    return (
      <View>
        <FlatList
          style={{ marginTop: 25, marginBottom: 25 }}
          keyExtractor={(item, index) => index}
          data={this.state.WellnessBreak}
          renderItem={({ item }) => (
            <View>
            {this.state.currentTimeStamp < item.TimeStamp ? 
          <View style={{flexDirection:'row'}}>
            
                <Image source={CROSS}></Image>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "300" }}>
                  {item.BreakTimeDisplay}
                </Text>

          </View>
           
            :
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MORE_DETAIL", {
                  id: item.WellnessBreakID,
                })
              }
              style={{
                flexDirection: "row",
                marginTop: 40,
                marginLeft: 40,
                alignItems: "center",
              }}
            >
            
          <Image source={Uncheck}></Image>
         
             
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "300" }}>
                {item.BreakTimeDisplay}
              </Text>
            </TouchableOpacity>

            }

            </View>

          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  render() {
    const { today } = this.state;
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
            source={require("./../../assets/images/burger/burger.png")}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={ () => this.props.navigation.navigate('MORE_DETAIL')}
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../../assets/images/arrow/leftarrow.png")}
          ></Image>
          <Text style={styles.h1}>{this.state.today}</Text>
          <TouchableOpacity
            onPress={() => this.showCal()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("./../../assets/images/calendar/calendar.png")}
            ></Image>
          </TouchableOpacity>
        </TouchableOpacity>

        {this.state.showCalendar && (
          <CalendarPicker
            maxDate={this.state.maxDate}
            onDateChange={this.onDateChange}
          />
        )}

        <View
          style={{
            marginRight: 10,
            marginLeft: 10,
            marginTop: 25,
            borderColor: "black",
            borderWidth: 1,
            height: 350,
          }}
        >
          {/* <Text style={{ marginTop: 20, fontSize: 15, marginLeft: 20 }}>
            There's still time!
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 20 }}>
            Time remaining to complete this item:
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 5,
              marginLeft: 80,
              fontWeight: "300",
            }}
          >
            00:40:13
          </Text> */}

          {this.renderFlatList()}

          
        </View>

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
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
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
});

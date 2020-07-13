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
  Platform,
  StatusBar,
} from "react-native";
import Constants from "../../color";

import Check from "./../../assets/images/check/check.png";
import Uncheck from "./../../assets/images/uncheck/uncheck.png";
import cross from './../../assets/images/cross/cross.png' ;

import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { FITBIZ_REST_API_URLS } from "../utils/https";
import Loading from "react-native-whc-loading";
import { fitbizfetcher } from "../utils/FitBizFetcher";
import Toolbar from './../../assets/components/toolbar' ;
import CountDown from 'react-native-countdown-component';

export default class otp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      exercise_name: "EXERCISE NAME",
      image: Uncheck,
      image1: Check,
      showCalendar: false,
      image3: Uncheck,
      selectedStartDate: null,
      selectedStartDate: null,
      selectedDate: "Today",
      maxDate: "",
       WellnessBreak: [],
       currentDate:'' ,
       selectedDateforDisbale:'' ,
       currentTimeStamp :0 ,
       diff:0 ,
       currentTimeForTest:0

    };

    this.onDateChange = this.onDateChange.bind(this);
  }

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

  getWllnessBreakDaybyDay = async (name, password, id, date) => {
    this.refs.loading.show();
    try {
      const URL =
        FITBIZ_REST_API_URLS.GetWellnessBreaksByDay +
        `username=${name}&password=${password}&companyID=${id}&breakDate=${date}`;
      console.log("URL", URL);
      const response = await fitbizfetcher({
        method: "GET",
        url: URL,
      });
      const res1 = response.json;
      this.refs.loading.close();
       if(res1.ErrorCode === 0){
 
      this.setState({
        WellnessBreak: res1.WellnessBreakItemList,
      });
      }
      else{
        alert("No record found")
      }
      // });
      const res = response.json;
      console.log("response", res);
    } catch (error) {
      this.refs.loading.close();
      console.log("error", error);
      // this.props.setLoaderVisibility(false);
    }
  };
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      showCalendar: false,
      selectedDateforDisbale : moment(date).format('DD-MM-YYYY') ,
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

  componentDidMount() {
    const today = new Date();
    const tomorrow = new Date(today);
    const newtom = tomorrow.setDate(tomorrow.getDate());
    const maxDate = new Date(newtom);
    this.setState({
      maxDate: maxDate,
      currentTime : moment(today).format('LLL') ,
      currentDate:moment(today).format('DD-MM-YYYY'),
      currentTimeForTest:moment(today).format('LT'),

    });

    var startTime = moment("1:00:00 pm", "HH:mm:ss a");
    var endTime = moment("03:00:00 pm", "HH:mm:ss a");

    // calculate total duration
    var duration = moment.duration(endTime.diff(today));

    // duration in hours
    var hours = parseInt(duration.asHours());
    console.log("differece", hours);
    this.getWllnessBreakDaybyDay(
      "Naveed",
      "pass",
      "1",
      moment(today).format("YYYY-MM-DD"))

      this.setState({
        currentTimeStamp:Math.floor(Date.now() / 1000)
      })
  }

  componentWillMount() {
    // const name = this.props.navigation.state.params.name
    // this.setState({
    //     exercise_name : name
    // })
  }

  changepic = () => {
    if (this.state.image === Check) {
      console.log("under if");
      this.setState({
        image: Uncheck,
      });
      this.forceUpdate();
    } else if (this.state.image === Uncheck) {
      this.setState({
        image: Check,
      });
    }
  };

  changepic2 = () => {
    if (this.state.image3 === Check) {
      console.log("under if");
      this.setState({
        image3: Uncheck,
      });
      this.forceUpdate();
    } else if (this.state.image3 === Uncheck) {
      this.setState({
        image3: Check,
      });
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

  changepic1 = () => {
    if (this.state.image1 === Check) {
      console.log("under if");
      this.setState({
        image1: Uncheck,
      });
      this.forceUpdate();
    } else if (this.state.image1 === Uncheck) {
      this.setState({
        image1: Check,
      });
    }
  };

  renderCountdown = (timestamp) =>{
   // console.log("status" ,(moment('11:30 PM', 'h:mma').isBefore(moment(this.state.currentTimeForTest, 'h:mma'))));
  //  console.log("current time" , this.state.currentTimeStamp)
  //  console.log("timestamp" , timestamp);
    var resolution
// var EndTime = 1594447200
// var StartTime = 1594450800
// resolution1 = EndTime - StartTime
    resolution =  this.state.currentTimeStamp - timestamp 
    var newTime = Math.abs(resolution) ;
  console.log("newTime" , newTime)
  console.log("time remaining" , Math.floor(newTime / 3600) % 24+  " ->"  + Math.floor(newTime / 60) % 60 +"->" + newTime )  ;
    // console.log("minutes" , Math.floor(newTime / 60) % 60) ;
    // console.log("seconds" ,newTime ) ;
  // this.setState({
  //   diff:resolutionTime
  // })
  //console.log("countdown time" , resolutionTime)

    return( <View>
        <CountDown
        digitStyle={{backgroundColor: '#FFF'}}
        until={newTime}
       // timeToShow={['H', 'M']}
       // timeLabels={{m: null, s: null}} 
        //onFinish={() => alert('finished')}
       // onPress={() => alert('hello')}
       separatorStyle={{color: 'black'}}
       showSeparator
        size={15}
      />
    </View>

     )
  }
  render() {
    const { selectedStartDate, selectedDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";

    return (
      <View style={styles.container}>
        

        <Toolbar navigation={this.props.navigation} title="Wellness Break History"></Toolbar>

        
 
         <View style={{width:'100%',
    fontWeight: "bold" , height:35,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
            <Text style={{fontSize:20}}>{this.state.currentTime}</Text>
          </View>

        {this.state.showCalendar && (
          <CalendarPicker
            maxDate={this.state.maxDate}
            onDateChange={this.onDateChange}
          />
        )}
          {/* <CountDown
        until={64088}
       // onFinish={() => alert('finished')}
       // onPress={() => alert('hello')}
        size={20}
      /> */}
    

        {/* {this.state.showCalendar && (
          <TouchableOpacity onPress={() => this.showCal()}>
             <CalendarPicker
          onDateChange={this.onDateChange}
        />
          </TouchableOpacity>
        )} */}

        <View style={{ margin: 20 }}>
          <TouchableOpacity
            onPress={() => this.showCal()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("./../../assets/images/calendar/calendar.png")}
            ></Image>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>{selectedDate}</Text>
          </TouchableOpacity>

          <FlatList
          style={{ marginTop: 25, marginBottom: 150 }}
          keyExtractor={(item, index) => index}
          data={this.state.WellnessBreak}
          renderItem={({ item }) => (
            <View>

          
                    <View>
                      {(moment(this.state.currentDate,'DD-MM-YYYY').valueOf()) > (moment(this.state.selectedDateforDisbale,'DD-MM-YYYY').valueOf()) ?
                              <View style={{flexDirection:'row',alignItems:'center',marginVertical:5}}>
                            
                                  <Image source={cross}></Image>
                                  <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "300",color:'grey' }}>
                                    {item.BreakTimeDisplay}
                                  </Text>

                              </View>
                      :

                      <View>
                                {(moment(item.BreakTimeDisplay, 'h:mma').isBefore(moment(this.state.currentTimeForTest, 'h:mma'))) === true ? 
                                        <View style={{flexDirection:'row',alignItems:'center',marginVertical:5}}>
                                          
                                              <Image source={cross}></Image>
                                              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "300",color:'grey' }}>
                                                {item.BreakTimeDisplay}
                                              </Text>
                                             
                                        </View>
                                        
                                          :
                                          <View style={{marginVertical:10}}>

                                                    <TouchableOpacity
                                                            onPress={() =>
                                                              this.props.navigation.navigate("MORE_DETAIL", {
                                                                id: item.WellnessBreakID,
                                                                time : item.BreakTimeDisplay
                                                              }) }
                                                              style={{flexDirection: "row",  alignItems: "center"}}>
                                                  
                                                                    <Image source={Uncheck}></Image>
                                                          
                                                              
                                                                    <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "300" }}>
                                                                      {item.BreakTimeDisplay}
                                                                    </Text>
                                                                   
                                                  </TouchableOpacity>
                                                  <View style={{marginHorizontal:35}}>
                                                      <Text>There is still time left! </Text>
                                                      <Text>Time remaining to complete this item: </Text>
                                                  </View>
                                                
                                                  {this.renderCountdown(item.TimeStamp)}
                                          </View>
                                         

                                         

                                          }
                      </View>
                    
                    }



                    </View>
            <View>


         

            </View>
            </View>

          )}
          keyExtractor={(item, index) => index.toString()}
        />

          {/* <TouchableOpacity
            onPress={() => this.changepic2()}
            style={{ flexDirection: "row", marginTop: 50, marginLeft: 10 }}
          >
            <Image style={{ marginTop: 5 }} source={this.state.image3}></Image>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 15 }}>3:00 PM</Text>
              <Text style={{ fontSize: 15 }}>There's still time!</Text>
              <Text style={{ fontSize: 15 }}>
                Time remaining to complete this item:
              </Text>
              <Text style={{ fontSize: 15 }}>00:40:13</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.changepic()}
            style={styles.tuch}
          >
            <Image source={this.state.image}></Image>
            <Text style={{ fontSize: 15, marginLeft: 20 }}>1:00 PM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.changepic1()}
            style={styles.tuch}
          >
            <Image source={this.state.image1}></Image>
            <Text style={{ fontSize: 15, marginLeft: 20 }}>okay</Text>
          </TouchableOpacity> */}
        </View>
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tuch: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 10,
    alignItems: "center",
  },
});

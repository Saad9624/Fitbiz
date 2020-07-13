import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import login from "./screens/login";
import otp from "./screens/otp";
import Home from "./screens/home";
import exercie_description from "./screens/exercise/exercie_description";
import exercise_visuals from "./screens/exercise/exercise_visuals";
import wellbreak from "./screens/wellness/break";
import breakdetails from "./screens/wellness/breakdetails";
import more_detail from "./screens/wellness/more_details";
import Video from "./screens/wellness/video";

import start_exercise from "./screens/wellness/start_exercise";
import Timer from "./screens/timer/timer.js";
import AfterSubmittingExercise from './screens/wellness/AfterSubmittingExercise' 

const AppNavigator = createStackNavigator(
  {
    // Home: registration,
    LOGIN: login,
    OTP: otp,
    HOME: Home,

    EXERCISE_DESCRIPTION: exercie_description,
    EXERCISE_VISUALS: exercise_visuals,

    WELNESS_BREAK: wellbreak, // side bar screen

    WEELNESS_DETAIL: breakdetails, // today screen this is where to start
    MORE_DETAIL: more_detail,
    START_EXRCISE: start_exercise,
    Video: Video,
    Timer: Timer,
    AfterSubmittingExercise :AfterSubmittingExercise ,
  },
  {
    initialRouteName: "LOGIN",
  }
);

const DrawerNavigation = createDrawerNavigator(
  {
    Home: AppNavigator,
  },
  {
    drawerPosition: "right",
    contentComponent: otp,
  }
);

export default createAppContainer(DrawerNavigation);

/// export default createAppContainer(AppNavigator);

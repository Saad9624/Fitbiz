//Development
//export const API_BASE_URL = "https://loadoye.com/load_oye/mobile/fleet/";
export const API_BASE_URL =
  "http://fitbitzapi-env.4zm2regmgg.us-east-1.elasticbeanstalk.com/api/Wellness/";

export const FITBIZ_REST_API_URLS = {
  
  wellness_break: API_BASE_URL + "GetWellnessExcerciseItems?",
  exercise_details: API_BASE_URL + "GetExerciseDetail?",

  GetWellnessBreaksByDay: API_BASE_URL + "GetWellnessBreaksByDay?",
  UpdateWellnessExerciseDuration:
    API_BASE_URL + "UpdateWellnessExerciseDuration?",

    SubmitExerciseDuration : API_BASE_URL + 'SubmitWellnessExercise?' 
};

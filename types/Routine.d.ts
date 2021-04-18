export interface RoutineListObject {
  _id: string;
  title: string;
}

export interface RoutineResponse {
  allRoutines: {
    data: Array<RoutineListObject>;
  };
}


import { Task } from './Task';

export interface RoutineListObject {
  _id: string;
  title: string;
}

export interface RoutineResponse {
  allRoutines: {
    data: Array<RoutineListObject>;
  };
}

export interface FindRoutineByIDResponse {
  findRoutineByID:
    | ({
        tasks: Array<Task>;
      } & RoutineListObject)
    | null;
}

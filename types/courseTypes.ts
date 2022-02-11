// TODO fill with stuff
export interface Course {
  id: String;
  title: String;
  description: String;
  teacherID: String;
  room: String;
}

export type TimeSlot =
  'week'
  | 'half-week'
  | 'slot-one'
  | 'slot-two'
  | 'either-slot'
  | ''
  | 'not-sure';


export interface CourseType {
  id: string;
  title: string;
  teacherID: string;
  description: string;
  room: string;
  timeSlot: TimeSlot;
}
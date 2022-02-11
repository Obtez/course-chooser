import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {CourseType, TimeSlot} from "types/courseTypes";


const emptyCourse: CourseType = {
  id: '',
  title: '',
  teacherID: '',
  description: '',
  room: '',
  timeSlot: '',
};

class Course {
  private title: string;
  private description: string;
  private room: string;
  private timeSlot: string;
  private id: string;
  private teacherID: string;

  constructor(
    title: string,
    description: string = '',
    room: string = '',
    timeslot: TimeSlot,
    teacherID: string,
  ) {
    this.title = title;
    this.description = description;
    this.room = room;
    this.timeSlot = timeslot;
    this.id = uuidv4();
    this.teacherID = teacherID;
  }
}

type Props = {
  userID: string;
};

export default function CourseForm({userID}: Props) {
  const [course, setCourse] = useState<CourseType>(emptyCourse);

  function handleChange(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    const {name, value} = e.currentTarget;
    setCourse({
      ...course,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {title, description, room, timeSlot} = course;
    const newCourse = new Course(title, description, room, timeSlot, userID);

    const res = await fetch(`http://localhost:3000/api/courses/add/${userID}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });
    const data = await res.json();
    // TODO implement success / failure message
    // if (res.ok) {}
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" value={course.title}
               onChange={handleChange} required={true}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description"
               value={course.description} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="room">Room</label>
        <input type="text" id="room" name="room" value={course.room}
               onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="timeSlot">Time Slot</label>
        <select name="timeSlot" id="timeSlot" onChange={handleChange}
                value={course.timeSlot} required={true}>
          <option value="" disabled={true}>Select a time slot</option>
          <option value="week">Whole Week</option>
          <option value="half-week">Half a Week (2x)</option>
          <option value="slot-one">Slot 1 only</option>
          <option value="slot-two">Slot 2 only</option>
          <option value="either-slot">Slot 1 or Slot 2</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  )
}
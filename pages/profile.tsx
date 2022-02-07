import React, { useState, useEffect } from 'react';
import NewUserWrapper from "../components/Layout/NewUserWrapper";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";

type Course = {
  id: String;
  title: String;
  description: String;
  teacherID: String;
  room: String;
}

type UserData = {
  firstName: string;
  lastName: string;
  gradeID: string;
}

const emptyUserData: UserData = {
  firstName: '',
  lastName: '',
  gradeID: '',
}

export default function Profile() {
  const [courses, setCourses] = useState<any>([]);
  const [userData, setUserData] = useState<UserData>(emptyUserData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useUser();

  useEffect(() => {
    if (!courses.length) {
      fetchCourses()
    }
  })

  async function fetchCourses() {
    if (!user) return null;
    const res = await fetch(`http://localhost:3000/api/student/courses/${user.sub}`);
    const data = await res.json();
    console.log(data)
    setCourses([data.topCourseID, data.midCourseID, data.lowCourseID])
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      gradeID: data.gradeID,
    })
    setIsLoading(false);
  }

  return (
    <NewUserWrapper>
      <div>
        <h1>Your Courses</h1>
        <p>{userData.firstName} {userData.lastName} ({userData.gradeID})</p>
        {
          !isLoading && (
            <ol>
              {
                courses.map((c: string) => (
                  <li key={c}>
                    <p>Priority: {c}</p>
                  </li>
                ))
              }
            </ol>
          )
        }
      </div>
    </NewUserWrapper>
  )
}


export const getServerSideProps = withPageAuthRequired();
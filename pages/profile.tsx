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

export default function Profile() {
  const [courses, setCourses] = useState<any>([]);
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
    setIsLoading(false);
  }

  return (
    <NewUserWrapper>
      <div>
        <h1>Your Courses</h1>
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
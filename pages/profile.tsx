import React, { useState, useEffect } from 'react';
import NewUserWrapper from "../components/Layout/NewUserWrapper";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0";
import AdminCourseList from "../components/Profile/AdminCourseList";
import TeacherCourseList from "../components/Profile/TeacherCourseList";

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

export default function Profile(props: any) {
  console.log(props.dbUser)
  if (props.dbUser.role === 'admin') {
    return (
      <div>
        <AdminCourseList userID={props.dbUser.id} />
      </div>
    )
  }

  if (props.dbUser.role === 'teacher') {
    return (
      <div>
        <TeacherCourseList userID={props.dbUser.id} />
      </div>
    )
  }

  return (
    <NewUserWrapper>
      <div>
        <h1>Your Courses</h1>

      </div>
    </NewUserWrapper>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    if (auth0User) {
      const id = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const data = await res.json();
      return {
        props: {
          dbUser: data,
        },
      };
    }
    return {
      props: {
        dbUser: null,
      }
    }
  },
});
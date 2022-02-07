import React from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import CourseForm from "../components/Form/CourseForm";
import CourseCard from "../components/Courses/CourseCard";

export default function Courses(props: any) {
  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        <h1>All Courses</h1>
        {/* <CourseForm userID={props.dbUser.id}/> */}
        <ul>
        {
          props.courses.map((c:any) => <CourseCard key={c.id} course={c} userID={props.user.sub} />)
        }
        </ul>
      </div>
    </NewUserWrapper>
  )
}


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    if (auth0User) {
      const id = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/courses/${id}`);
      const data = await res.json();
      return {
        props: {
          courses: data,
        },
      };
    }
    return {
      props: {
        courses: null,
      }
    }
  },
});
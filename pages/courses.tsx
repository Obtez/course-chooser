import React from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';

export default function Courses(props: any) {
  // role: student OR no user found
  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        <h1>All Courses</h1>
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
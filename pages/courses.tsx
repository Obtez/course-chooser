import React from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Courses(props: any) {
  console.log(props)
  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        <h1>All Courses</h1>
      </div>
    </NewUserWrapper>
  )
}

export default withPageAuthRequired(Courses);

export async function getServerSideProps(context: any) {
  console.log(context)
  return {
    props: {
      role: 'hi'
    }
  }
}


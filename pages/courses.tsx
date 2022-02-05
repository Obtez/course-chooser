import React from 'react';
import styles from '../styles/Courses.module.scss';
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

export default function Courses() {
  return (
    <div className={styles.page__container}>
      <h1>All Courses</h1>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
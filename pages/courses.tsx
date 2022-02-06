import React from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Courses() {
  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        <h1>All Courses</h1>
      </div>
    </NewUserWrapper>
  )
}

export const getServerSideProps = withPageAuthRequired();
import React, {useState} from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import CourseForm from "../components/Form/CourseForm";
import CourseCard from "../components/Courses/CourseCard";
import PriorityModal from "../components/Modals/PriorityModal";

export default function Courses(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false)

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        {showModal && <PriorityModal toggleModal={toggleModal} />}
        <h1>All Courses</h1>
        {/* <CourseForm userID={props.dbUser.id}/> */}
        <ul>
        {
          props.courses.allCourses.map((c:any) => {
            const hasApplied = () => {
              if (c.id === props.courses.topCourseID) return true;
              if (c.id === props.courses.midCourseID) return true;
              if (c.id === props.courses.lowCourseID) return true;
              return false;
            }

          return (
            <CourseCard
              key={c.id}
              course={c}
              userID={props.user.sub}
              hasApplied={hasApplied()}
              toggleModal={toggleModal}
            />
          )
          })
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
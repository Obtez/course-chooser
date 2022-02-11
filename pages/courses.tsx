import React, {useEffect, useState} from 'react';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {matchCourseTitle} from "../helpers/courseHelpers";
import {useAppSelector, useAppDispatch} from "../hooks/reduxHooks";
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import CourseCard from "../components/Courses/CourseCard";
import PriorityModal from "../components/Modals/PriorityModal";
import styles from '../styles/Courses.module.scss';
import {setRole} from "../features/userSlice";

export default function Courses(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newPriority, setNewPriority] = useState<string>('')
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true)

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) {
      const userRole = props.role.role;
      dispatch(setRole(userRole))
      setLoading(false)
    }
  }, [loading, props.role.role, dispatch])


  function toggleModal(newPriorityID: string) {
    setShowModal(!showModal);
    setNewPriority(newPriorityID);
  }

  if (!user) return null;

  // TODO implement different role lists
  if (user.role === 'student') {
    if (courses.length === 0) {
      setCourses([...props.courses.allCourses]);
    }
  }

  if (user.role === 'admin') {
    if (props.courses && courses.length === 0) {
      setCourses(props.courses);
    }
  }

  function createPriorities() {
    return {
      topPriority: matchCourseTitle(props.courses.topCourseID),
      midPriority: matchCourseTitle(props.courses.midCourseID),
      lowPriority: matchCourseTitle(props.courses.lowCourseID),
    }
  }

  return (
    <NewUserWrapper>
      <div className={styles.page__container}>
        {showModal && <PriorityModal
            userID={props.userID}
            toggleModal={toggleModal}
            priorities={createPriorities()}
            newPriority={newPriority}
        />}
        <h1>All Courses</h1>
        {/* <CourseForm userID={props.dbUser.id}/> */}
        <ul>
        {
          courses.length && courses.map((c:any) => {
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
      const userID = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/courses/${userID}`);
      const courses = await res.json();

      const res2 = await fetch(`http://localhost:3000/api/user/role/${userID}`);
      const role = await res2.json();

      return {
        props: {
          courses,
          userID,
          role,
        },
      };
    }
    return {
      props: {
        courses: null,
        userID: null,
        role: null,
      }
    }
  },
});
import React, {useEffect, useState} from 'react';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {
  fetchCoursesWithUserID,
  fetchUserRole,
  matchCourseTitle
} from "../helpers/courseHelpers";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
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

  if (user.role === 'teacher') {
    // TODO implement this one
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
            courses.length && courses.map((c: any) => {
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
  getServerSideProps: async ({req, res}) => {
    const auth0User = getSession(req, res);
    if (auth0User) {
      const courses = await fetchCoursesWithUserID(auth0User.user.sub);
      const role = await fetchUserRole(auth0User.user.sub);

      return {
        props: {
          courses,
          userID: auth0User.user.sub,
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
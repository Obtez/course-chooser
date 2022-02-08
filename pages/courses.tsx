import React, {useState} from 'react';
import NewUserWrapper from '../components/Layout/NewUserWrapper';
import styles from '../styles/Courses.module.scss';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import CourseCard from "../components/Courses/CourseCard";
import PriorityModal from "../components/Modals/PriorityModal";

export default function Courses(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newPriority, setNewPriority] = useState<string>('')
  const [courses, setCourses] = useState<any>([]);

  function toggleModal(newPriorityID: string) {
    setShowModal(!showModal);
    setNewPriority(newPriorityID);
  }

  // TODO Change props.userRole.role.role to be more compact
  const userRole = props.userRole.role.role;

  // TODO implement different role lists
  if (userRole === 'student') {
    if (courses.length === 0) {
      console.log(props.courses.allCourses)
      setCourses([...props.courses.allCourses]);
    }
  }

  function matchCourseTitle(courseID: string) {
    if (!courseID) return { id: '', title: '' };
    const course = props.courses.allCourses.find((c: any) => c.id === courseID);
    if (course) {
      return {
        title: course.title,
        id: courseID,
      };
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
      const id = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/courses/${id}`);
      const data = await res.json();

      const res2 = await fetch(`http://localhost:3000/api/user/role/${id}`);
      const role = await res2.json();

      return {
        props: {
          courses: data,
          userID: id,
          userRole: role,
        },
      };
    }
    return {
      props: {
        courses: null,
        userID: null,
        userRole: null,
      }
    }
  },
});
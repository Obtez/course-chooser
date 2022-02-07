import React from 'react';
import styles from './CourseCard.module.scss';

export default function CourseCard(props: any) {
  const { course } = props;
  const { userID } = props;

  const convertedTimeSlot = () => {
    switch(course.timeSlot) {
      case 'week':
        return 'Whole Week';

      case 'half-week':
        return 'Half a Week (2x)';

      case 'slot-one':
        return 'Slot 1 only';

      case 'slot-two':
        return 'Slot 2 only';

      case 'either-slot':
        return 'Slot 1 or Slot 2';

      case 'not-sure':
        return 'Time Slot not decided yet'

      default:
        throw new Error('invalid time slot');
    }
  }

  async function applyToCourse() {
    const res = await fetch('http://localhost:3000/api/student/courses', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({userID, courseID: course.id})
    })
  }

  return (
    <div className={styles.card}>
      <span className={`${styles.tag} ${styles[course.timeSlot]}`}>{convertedTimeSlot()}</span>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{course.title}</h3>
      </div>
      <div className={styles.card__body}>
        <p className={styles.card__content}>
          <span className={styles.card__teacher}>David Beer</span>
          {
            course.room && <span className={styles.card__room}>{' '}({course.room})</span>
          }
        </p>
        <p className={styles.card__description}>{course.description}</p>
      </div>
      <div className={styles.card__footer}>
        <button className={styles.card__applyBtn} type="button" onClick={applyToCourse}>Apply</button>
      </div>

    </div>
  )
}
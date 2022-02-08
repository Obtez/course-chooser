import React, {useState} from 'react';
import styles from './Modal.module.scss';

export default function PriorityModal(props: any) {
  const [currPriorities, setCurrPriorities] = useState<any>({
    topPriority: { ...props.priorities.topPriority },
    midPriority: { ...props.priorities.midPriority },
    lowPriority: { ...props.priorities.lowPriority },
  })

  const userID = props.userID.toString();

  // TODO doesnt work when applying to different courses
  function setTopPriority() {
    setCurrPriorities({
      topPriority: {...props.newPriority},
      midPriority: () => currPriorities.midPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.midPriority,
      lowPriority: () => currPriorities.lowPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.lowPriority,
    });
  }

  function setMidPriority() {
    setCurrPriorities({
      midPriority: {...props.newPriority},
      topPriority: () => currPriorities.topPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.topPriority,
      lowPriority: () => currPriorities.lowPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.lowPriority,
    });
  }

  function setLowPriority() {
    setCurrPriorities({
      lowPriority: {...props.newPriority},
      midPriority: () => currPriorities.midPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.midPriority,
      topPriority: () => currPriorities.topPriority.id === props.newPriority.id ? { id: '', title: '' } : currPriorities.topPriority,
    });
  }

  // TODO re-render page
  async function updateCoursesInDB() {
    const res = await fetch(`http://localhost:3000/api/student/courses/update/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(currPriorities),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__title}>Your Courses</h2>
      </div>
      <div className={styles.modal__body}>
        <ol className={styles.modal__list}>
          <li className={styles.modal__list__item}>
            <div className={styles.modal__list__left}>
              <span>1. Priority:</span>
              <span className={styles.modal__course__title}>{ currPriorities.topPriority.title || 'Nothing here' }</span>
            </div>
            <button type="button" onClick={setTopPriority}>X</button>
          </li>
          <li className={styles.modal__list__item}>
            <div className={styles.modal__list__left}>
              <span>2. Priority:</span>
              <span className={styles.modal__course__title}>{ currPriorities.midPriority.title || 'Nothing here' }</span>
            </div>
            <button type="button" onClick={setMidPriority}>X</button>
          </li>
          <li className={styles.modal__list__item}>
            <div className={styles.modal__list__left}>
              <span>3. Priority:</span>
              <span className={styles.modal__course__title}>{ currPriorities.lowPriority.title || 'Nothing here' }</span>
            </div>
            <button type="button" onClick={setLowPriority}>X</button>
          </li>
        </ol>
      </div>
      <div className={styles.modal__footer}>
        <button
          className={styles.modal__saveBtn}
          type="button"
          onClick={updateCoursesInDB}>Save</button>
        <button className={styles.modal__saveBtn} type="button" onClick={props.toggleModal}>Close without Saving</button>
      </div>
    </div>
  )
}
import styles from '../styles/Home.module.scss';
import AnchorLink from "../components/Atoms/AnchorLink/AnchorLink";

export default function Home() {
  return (<div className={styles.page__container}>
    <h1 className={styles.page__title}>Welcome</h1>
      <p className={styles.page__slogan}>Login to choose the courses you are interested in or manage the ones
        you have already applied to.</p>

    <div className={styles.btn__container}>
      <AnchorLink href={'/courses'} variant={'primary'}>All Courses</AnchorLink>
      <AnchorLink href={'/profile'} variant={'secondary'}>Your Courses</AnchorLink>
    </div>
    </div>)
}

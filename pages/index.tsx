import styles from '../styles/Home.module.scss';
import AnchorLink from "../components/Atoms/AnchorLink/AnchorLink";
import {useUser} from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, isLoading } = useUser();

  if (!isLoading && !user) {
    return (<div className={styles.page__container}>
      <h1 className={styles.page__title}>Welcome</h1>
      <p className={styles.page__slogan}>Login to choose the courses you are interested in or manage the ones
        you have already applied to.</p>

      <div className={styles.btn__container}>
        <AnchorLink href={'/api/auth/login'} variant={'primary'}>LOGIN</AnchorLink>
      </div>
    </div>)
  }

  return (<div className={styles.page__container}>
    <h1 className={styles.page__title}>Welcome</h1>
      <p className={styles.page__slogan}>Login to choose the courses you are interested in or manage the ones
        you have already applied to.</p>

    <div className={styles.btn__container}>
      <AnchorLink href={'/courses'} variant={'primary'}>All Courses</AnchorLink>
      <AnchorLink href={'/profile'} variant={'secondary'}>Profile</AnchorLink>
    </div>
    </div>)
}

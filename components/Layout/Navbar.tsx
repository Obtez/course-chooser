import React from 'react';
import Link from 'next/link';
import styles from './Layout.module.scss';

export default function Navbar() {
  return (<div className={styles.navbar__wrapper}>
    <nav>
      <div className={styles.navbar}>
        <Link href={'/'}>
          <a className={styles.logo}>Courses</a>
        </Link>
        <ul className={styles.navbar__menu}>
          <li>
            <Link href={'/'}>
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link href={'/courses'}>
              <a>Courses</a>
            </Link>
          </li>

          <li>
            <Link href={'/profile'}>
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>)
}
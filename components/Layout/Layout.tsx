import React, {ReactNode} from 'react';
import Head from "next/head";
import Navbar from "./Navbar";
import styles from './Layout.module.scss';
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {

  return (<div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
      </Head>
      <Navbar/>
      <main className={styles.main__container}>
        {children}
      </main>
    <Footer />
    </div>)
}
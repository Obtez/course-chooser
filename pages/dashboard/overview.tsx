import React from 'react';
import Link from "next/link";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import CSV from "../../components/CSV/CSV";

export default function Overview(props: any) {
  if (!props.userData || props.userData.role === 'student') {
    return (
      <div>
        <p>You do not have permission to view this page.</p>
        <Link href="/">Return to Home</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Overview</h1>
      {
        props.courses.map((c: any) => <li key={c.id}>{ c.title }</li>)
      }
      <CSV courses={props.courses} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    if (auth0User) {
      const id = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/courses/${id}`);
      const data = await res.json();

      const userRes = await fetch(`http://localhost:3000/api/user/${id}`);
      const userData = await userRes.json();

      return {
        props: {
          courses: data,
          userData: userData
        },
      };
    }
    return {
      props: {
        courses: null,
        userData: null,
      }
    }
  },
});
import React from 'react';
import NewUserWrapper from "../components/Layout/NewUserWrapper";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";

export default function Profile() {
  return (
    <NewUserWrapper>
      <div>
        <h1>Your Courses</h1>
        <p>WIP</p>
      </div>
    </NewUserWrapper>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    if (auth0User) {
      const id = auth0User.user.sub;
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const data = await res.json();
      return {
        props: {
          dbUser: data,
        },
      };
    }
    return {
      props: {
        dbUser: null,
      }
    }
  },
});
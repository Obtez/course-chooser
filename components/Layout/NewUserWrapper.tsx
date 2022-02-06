import React, { useState, useEffect } from 'react';
import { useUser } from "@auth0/nextjs-auth0";
import NewUserForm from "../NewUser/NewUserForm";

type Props = {
  children: React.ReactNode;
}

export default function NewUserWrapper({ children }: Props) {
  const [isNew, setIsNew] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    userIsStored();
  })

  async function userIsStored () {
    // @ts-ignore
    if (user && user.sub) {
      // @ts-ignore
      const res = await fetch(`http://localhost:3000/api/user/${user.sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json();
      if (data.message === 'User not found.') {
        setIsNew(true);
      } else {
        setIsNew(false);
      }
    }

  }

  return (
    <div>
      {
        isNew ? (
          <>
            <NewUserForm />
          </>
        ) : (
          <>
            { children }
          </>
        )
      }
    </div>
  )
}
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useUser} from "@auth0/nextjs-auth0";
import NewUserForm from "../NewUser/NewUserForm";

type Props = {
  children: React.ReactNode;
}

type Student = {
  firstName: string;
  lastName: string;
  gradeID: string;
  role: string;
  topCourseID: string;
  midCourseID: string;
  lowCourseID: string;
}

type Admin = {
  firstName: string;
  lastName: string;
  role: string;
}

type Teacher = {
  firstName: string;
  lastName: string;
  gradeID: string;
  role: string;
  courseID: string;
}

type UserData = Admin | Teacher | Student;

const emptyUserData: UserData = {
  firstName: '',
  lastName: '',
  role: '',
};

export default function NewUserWrapper({ children }: Props) {
  const [isNew, setIsNew] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>(emptyUserData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    if(isNew && isLoading) {
      userIsStored();
    }
  })

  function toggleIsNew () {
    setIsNew(false);
  }

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
        setIsLoading(false);
      } else {
        setUserData({...data});
        setIsNew(false);
        setIsLoading(false);
      }
    }

  }

  return (
    <div>
      {
        isLoading && <p>Loading</p>
      }
      {
        !isLoading && isNew ? (
          <>
            <NewUserForm toggleIsNew={toggleIsNew} />
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
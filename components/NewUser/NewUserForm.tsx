import React, {FormEvent, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

type UserData = {
  firstName: string;
  lastName: string;
}

const emptyUserData: UserData = {
  firstName: '',
  lastName: '',
};

export default function NewUserForm() {
  const [userData, setUserData] = useState<UserData>(emptyUserData);
  const { user } = useUser();
  const router = useRouter();

  if (!user) return null;

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (user) {
      createUser()
    }
  }

  async function createUser() {
    if (!user) return null;
    const res = await fetch(`http://localhost:3000/api/user/${user.sub}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      router.push('courses');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} />
      </div>
      <div>
        <input type="submit" value="Save"/>
      </div>
    </form>
  )
}
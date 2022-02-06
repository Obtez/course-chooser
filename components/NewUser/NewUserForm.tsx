import React, {FormEvent, useState} from "react";
import {useUser} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

type UserData = {
  firstName: string;
  lastName: string;
  grade: string;
}

const emptyUserData: UserData = {
  firstName: '',
  lastName: '',
  grade: '',
};

const gradesArr: string[] = ['A1a', 'A1b', 'B1a', 'B1b', 'C1', 'A2a', 'A2b', 'B2a', 'B2b', 'C2', 'A3a', 'A3b', 'B3a', 'B3b', 'C3'];

export default function NewUserForm() {
  const [userData, setUserData] = useState<UserData>(emptyUserData);
  const [showError, setShowError] = useState<boolean>(false);
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

  function handleSelect(e: FormEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    setUserData({
      ...userData,
      grade: value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const { firstName, lastName, grade } = userData;
    if (!firstName || !lastName || !grade) {
      setShowError(true);
      return null;
    }

    if (user) {
      setShowError(false);
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
        <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} required={true} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} required={true} />
      </div>
      <div>
        <label htmlFor="grade">Grade</label>
        <select name="grade" id="grade" onChange={handleSelect} value={userData.grade} required={true}>
          <option value="" disabled={true}>Select your grade</option>
          {
            gradesArr.map(g => <option key={g} value={g}>{g}</option>)
          }
        </select>
      </div>
      <div>
        <input type="submit" value="Save"/>
      </div>
      {
        showError && <p>You need to fill out all fields.</p>
      }
    </form>
  )
}
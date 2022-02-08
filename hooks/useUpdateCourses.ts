import { useState, useEffect } from "react";

function useUpdateCourses(updCourses: any, id: string) {
  const [courses, setCourses] = useState<any>(null);

  useEffect(() => {
    updCourses();
  });

  async function updateCourses() {
    const res = await fetch(`http://localhost:3000/api/student/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updCourses),
    });

    const data = await res.json();
    setCourses(data);
  }

  return courses;
}
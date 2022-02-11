export function matchCourseTitle(courseID: string, allCourses = []) {
  if (!courseID || allCourses.length === 0) return { id: '', title: '' };

  const course = allCourses.find((c: any) => c.id === courseID);
  if (course) {
    return {
      // @ts-ignore
      title: course.title,
      id: courseID,
    };
  }

  return { id: '', title: '' };
}


export async function fetchCoursesWithUserID(userID: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${userID}`);
  return await res.json();
}

export async function fetchUserRole(userID: string) {
  const res = await fetch(`http://localhost:3000/api/user/role/${userID}`);
   return await res.json();
}
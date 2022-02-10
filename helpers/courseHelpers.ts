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
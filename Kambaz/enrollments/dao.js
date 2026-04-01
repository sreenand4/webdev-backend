import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const existing = db.enrollments.find(
      (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    if (existing) return existing;
    const enrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(enrollment);
    return enrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId)
    );
    return db.enrollments;
  }

  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function findUsersForCourse(courseId) {
    const userIds = db.enrollments
      .filter((enrollment) => enrollment.course === courseId)
      .map((enrollment) => enrollment.user);
    return db.users.filter((user) => userIds.includes(user._id));
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findUsersForCourse,
  };
}

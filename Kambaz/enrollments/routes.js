import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findMyEnrollments = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollments = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(enrollments);
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/users/current/courses/:courseId/enrollment", enrollInCourse);
  app.delete(
    "/api/users/current/courses/:courseId/enrollment",
    unenrollFromCourse
  );
}

import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((assignment) => assignment.course === courseId);
  }

  function findAssignmentById(assignmentId) {
    return db.assignments.find((assignment) => assignment._id === assignmentId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return db.assignments;
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}

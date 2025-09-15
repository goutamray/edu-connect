import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";

/**
 *
 * @param {*} courseId
 * @returns
 */
export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollments);
}

/**
 *
 * @param {*} courseId
 * @param {*} userId
 * @param {*} paymentMethod
 */
export async function enrollForCourse(courseId, userId, paymentMethod) {
  const newEnrollment = {
    course: courseId,
    student: userId,
    enrollment_date: Date.now(),
    status: "not-started",
    method: paymentMethod,
  };

  try {
    const response = await Enrollment.create(newEnrollment);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 *
 * @param {*} userId
 */
export async function getEnrollmentsForUser(userId) {
  try {
    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();

    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 * @param {*} courseId
 * @param {*} studentId
 */
export async function hasEnrollmentsForCourse(courseId, studentId) {
  try {
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();

    if (!enrollment) return false;

    return true;
  } catch (error) {
    throw new Error(error);
  }
}

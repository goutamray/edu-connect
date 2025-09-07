import { replaceMongoIdInArray } from "@/lib/convertData";
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

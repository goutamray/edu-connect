import { auth } from "@/auth";
import { getUserByEmail } from "@/quires/users";

import { getCourseDetailsByInstructor } from "@/quires/courses";
import { getUserDetails } from "../quires/users";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

import { getAReports } from "@/quires/reports";
import { getCourseDetailsById } from "@/quires/courses";

/**
 *
 * @param {*} obj
 * @returns
 */
function makeJSONSafe(obj) {
  if (!obj) return obj;

  // If it's an ObjectId or has toString()
  if (
    obj.toString &&
    typeof obj.toString === "function" &&
    !Array.isArray(obj)
  ) {
    const str = obj.toString();
    // Prevent converting plain strings again
    if (!str.startsWith("[object")) return str;
  }

  // If Uint8Array, Buffer
  if (obj instanceof Uint8Array) {
    return Array.from(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((i) => makeJSONSafe(i));
  }

  if (typeof obj === "object") {
    const plain = {};
    for (const key in obj) {
      plain[key] = makeJSONSafe(obj[key]);
    }
    return plain;
  }

  return obj;
}

// const populateReviewData = async (reviews) => {
//   const populatedReviewData = await Promise.all(
//     reviews.map(async (review) => {
//       const student = await getUserDetails(review?.user?._id);
//       review["studentName"] = `${student?.firstName} ${student?.lastName}`;

//       return review;
//     })
//   );

//   return populatedReviewData;
// };

/**
 *
 * @param {*} reviews
 * @returns
 */
const populateReviewData = async (reviews) => {
  const populatedReviewData = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user?._id);

      return {
        ...review,
        _id: review._id?.toString(),
        user: {
          ...review.user,
          _id: review.user?._id?.toString(),
        },
        courseId: review.courseId?.toString(),
        studentName: `${student?.firstName} ${student?.lastName}`,
      };
    })
  );

  return populatedReviewData;
};

/**
 *
 * @param {*} enrollments
 */
const populateEnrollmentData = async (enrollments) => {
  const populatedEnrollData = await Promise.all(
    enrollments.map(async (enroll) => {
      const student = await getUserDetails(enroll?.student?._id);

      const filter = {
        course: enroll?.course?._id,
        student: enroll?.student?._id,
      };

      const report = await getAReports(filter);

      enroll["progress"] = 0;
      enroll["quizMark"] = 0;

      if (report) {
        // progress
        const course = await getCourseDetailsById(enroll?.course?._id);
        const totalModules = course?.modules?.length;
        // total completed modules
        const totalCompletedModules = report?.totalCompletedModules
          ? report?.totalCompletedModules?.length
          : 0;
        const progressData = (totalCompletedModules / totalModules) * 100;
        enroll["progress"] = progressData;

        // get all quizess and assignments
        const quizzess = report?.quizAssessment?.assessments;
        const totalQuizess = quizzess ? quizzess?.length : 0;

        // find attempted quizzess
        const quizzessTaken = quizzess?.filter((q) => q.attempted);
        const totalTaken = quizzessTaken ? quizzessTaken?.length : 0;

        // find how many quizzess answer correct
        const totalCorrect = quizzessTaken
          ?.map((quiz) => {
            const item = quiz?.options;

            return item.filter((o) => {
              return o.isCorrect === true && o.isSelected === true;
            });
          })
          .filter((elem) => elem?.length > 0)
          .flat();

        // mark from quiz
        const markFromQuiz = totalCorrect ? totalCorrect?.length * 5 : 0;
        enroll["quizMark"] = markFromQuiz;
      }

      return {
        ...enroll,
        _id: enroll._id?.toString(),
        user: {
          ...enroll.user,
          _id: enroll.user?._id?.toString(),
        },
        courseId: enroll.courseId?.toString(),
        studentName: `${student?.firstName} ${student?.lastName}`,
        studentEmail: `${student?.email}`,
      };
    })
  );

  return populatedEnrollData;
};

/**
 *
 * @param {*} dataType
 * @returns
 */
export async function getInstructorDashBoardData(dataType) {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session?.user?.email);

    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case REVIEW_DATA:
        const safe = makeJSONSafe(await populateReviewData(data?.reviews));
        return safe;
      // case REVIEW_DATA:
      //   return populateReviewData(data?.reviews);
      case ENROLLMENT_DATA:
        const safeData = makeJSONSafe(
          await populateEnrollmentData(data?.enrollments)
        );
        return safeData;

      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}

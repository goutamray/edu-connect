import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { Testimonial } from "@/models/testimonial-model";
import { User } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialByCourse } from "./testimonial";
import { Lesson } from "@/models/lesson-model";

/**
 *
 * @returns
 */
export async function getAllCourses() {
  const courses = await Course.find({})
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();

  return replaceMongoIdInArray(courses);
}

/**
 *
 * @param {*} id
 * @returns
 */
export async function getCourseDetailsById(id) {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
      populate: {
        path: "lessonIds",
        model: Lesson,
      },
    })
    .lean();

  return replaceMongoIdInObject(course);
}

/**
 *
 * @param {*} instructorId
 */
export async function getCourseDetailsByInstructor(instructorId, expand) {
  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses?.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course?._id.toString());

      return enrollment;
    })
  );

  const groupByCourses = Object.groupBy(
    enrollments.flat(),
    ({ course }) => course
  );

  const totalRevenue = courses.reduce((acc, course) => {
    return acc + groupByCourses[course._id].length * course.price;
  }, 0);

  const totalEnrollments =
    enrollments?.reduce((total, currentValue) => {
      return total + (currentValue?.length || 0);
    }, 0) || 0;

  const testimonials = await Promise.all(
    courses?.map(async (course) => {
      const testimonial = await getTestimonialByCourse(course?._id.toString());

      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();

  const avgRating =
    totalTestimonials.length > 0
      ? totalTestimonials.reduce((acc, obj) => acc + (obj?.rating || 0), 0) /
        totalTestimonials.length
      : 0;

  if (expand) {
    return {
      courses: courses?.flat(),
      enrollments: enrollments.flat(),
      reviews: totalTestimonials,
    };
  }
  return {
    courses: courses?.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials?.length,
    ratings: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
}

"use server";

import { create } from "@/quires/courses";
import { getLoggedInUser } from "@/lib/loggedinUser";
import { Course } from "@/models/course-model";

/**
 *
 * @param {*} data
 * @returns
 */
export async function createCourse(data) {
  try {
    const loggedInUser = await getLoggedInUser();
    data["instructor"] = loggedInUser?.id;
    const course = await create(data);
    return course;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 * @param {*} courseId
 */
export async function updateCourse(courseId, dataToUpdate) {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      dataToUpdate,
      {
        new: true,
      }
    );

    return JSON.parse(JSON.stringify(updateCourse));
  } catch (error) {
    throw new Error(error);
  }
}

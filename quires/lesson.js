import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lesson-model";

/**
 *
 * @param {*} lessonId
 * @returns
 */
export async function getLessions(lessonId) {
  if (!lessonId) return null;

  const lesson = await Lesson.findById(lessonId.toString()).lean();

  if (!lesson) return null;

  return replaceMongoIdInObject(lesson);
}

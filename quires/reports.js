import { Report } from "@/models/report-model";
import { Assessment } from "@/models/assessment-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lesson-model";
import { Module } from "@/models/module-model";

/**
 *
 * @param {*} filter
 * @returns
 */
export async function getAReports(filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "totalCompletedLessons",
        model: Lesson,
      })
      .populate({
        path: "totalCompletedModules",
        model: Module,
      })
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();

    return replaceMongoIdInObject(report);
  } catch (error) {
    throw new Error(error);
  }
}

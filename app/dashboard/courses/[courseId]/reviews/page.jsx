import { getCourseDetailsById } from "@/quires/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import {
  getInstructorDashBoardData,
  REVIEW_DATA,
} from "@/lib/dashboard-helper";

const ReviewsPage = async ({ params: { courseId } }) => {
  const course = await getCourseDetailsById(courseId);
  const reviewData = await getInstructorDashBoardData(REVIEW_DATA);

  const reviewDataForCourse = reviewData.filter(
    (review) => review?.courseId?.toString() === courseId
  );

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviewDataForCourse} />
    </div>
  );
};

export default ReviewsPage;

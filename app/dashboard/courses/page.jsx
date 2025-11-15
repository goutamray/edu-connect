import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import {
  getInstructorDashBoardData,
  COURSE_DATA,
} from "@/lib/dashboard-helper";

const CoursesPage = async () => {
  const data = await getInstructorDashBoardData(COURSE_DATA);
  const courses = JSON.parse(JSON.stringify(data));

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;

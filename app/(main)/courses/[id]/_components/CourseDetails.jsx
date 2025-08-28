import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatMyDate } from "@/lib/formatDate";
import CourseOverview from "./CourseOverview";
import CourseCuriculam from "./CourseCuriculam";
import CourseInstructor from "./CourseInstructor";
import Image from "next/image";

const CourseDetails = ({ course }) => {
  const lastModifiedDate = formatMyDate(course?.modifiedOn);

  return (
    <>
      <section className="py-8 md:py-12 lg:py-24 mx-auto">
        <div className="container">
          <span className="bg-[#0dcb10] px-4 py-0.5 rounded-full text-xs font-medium text-white inline-block">
            {course?.category?.title}
          </span>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3">
            {course?.title}
          </h3>
          <p className="mt-3 text-gray-600 text-sm">{course?.subtitle}</p>

          <div className="flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6">
            <div className="flex items-center gap-2">
              {course?.instructor?.profile_picture ? (
                <Image
                  className="w-[40px] h-[40px] rounded-full"
                  src={course.instructor.profile_picture}
                  alt={course?.instructor?.first_name || "Instructor"}
                  width={40}
                  height={40}
                />
              ) : null}

              <p className="font-bold">
                {course?.instructor?.first_name} {course?.instructor?.last_name}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-success font-semibold">Last Updated: </span>
              <span>{lastModifiedDate}</span>
            </div>
          </div>

          {/* Tab */}
          <div className="my-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 my-6 max-w-[768px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Carriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <CourseOverview course={course} />
              </TabsContent>
              <TabsContent value="curriculum">
                <CourseCuriculam course={course} />
              </TabsContent>
              <TabsContent value="instructor">
                <CourseInstructor course={course} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetails;

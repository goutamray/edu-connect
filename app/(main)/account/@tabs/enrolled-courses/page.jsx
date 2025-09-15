// import { CourseProgress } from "@/components/course-progress";

import EnrollCourseCard from "../../component/enrollCourseCard";

import { getEnrollmentsForUser } from "@/quires/enrollments";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/quires/users";

async function EnrolledCourses() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {!enrollments || enrollments?.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        enrollments?.map((enrollment) => (
          <EnrollCourseCard key={enrollment.id} enrollment={enrollment} />
        ))
      )}
    </div>
  );
}

export default EnrolledCourses;

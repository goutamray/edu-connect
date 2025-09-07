import RelatedCourse from "./_components/RelatedCourse";
import CourseIntro from "./_components/CourseIntro";
import CourseTestimonial from "./_components/CourseTestimonial";
import CourseDetails from "./_components/CourseDetails";
import { getCourseDetailsById } from "@/quires/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";

const courses = [
  {
    id: 1,
    title: "Design",
    thumbnail: "/assets/images/categories/design.jpg",
  },

  {
    id: 3,
    title: "Development",
    thumbnail: "/assets/images/categories/development.jpg",
  },
  {
    id: 4,
    title: "Marketing",
    thumbnail: "/assets/images/categories/marketing.jpg",
  },
  {
    id: 5,
    title: "IT & Software",
    thumbnail: "/assets/images/categories/it_software.jpg",
  },
  {
    id: 6,
    title: "Personal Development",
    thumbnail: "/assets/images/categories/personal_development.jpg",
  },
  {
    id: 7,
    title: "Business",
    thumbnail: "/assets/images/categories/business.jpg",
  },
  {
    id: 8,
    title: "Photography",
    thumbnail: "/assets/images/categories/photography.jpg",
  },
  {
    id: 9,
    title: "Music",
    thumbnail: "/assets/images/categories/music.jpg",
  },
];

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetailsById(id);

  return (
    <>
      <CourseIntro course={course} />

      <CourseDetails course={course} />

      <CourseTestimonial
        testimonials={replaceMongoIdInArray(course?.testimonials)}
      />

      <RelatedCourse courses={courses} />
    </>
  );
};
export default SingleCoursePage;

import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";

export async function getTestimonialByCourse(courseId) {
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();

  return replaceMongoIdInArray(testimonials);
}

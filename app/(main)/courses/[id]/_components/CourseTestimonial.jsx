import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionTitle } from "@/components/section-title";
import Rating from "./Rating";
import StarRating from "@/components/star-rating";
import Image from "next/image";

const CourseTestimonial = ({ testimonials }) => {
  return (
    <section className="pb-8 md:pb-12 lg:pb-24 mx-auto">
      <div className="container max-w-6xl mx-auto px-4">
        <SectionTitle className="mb-6">Testimonials</SectionTitle>
        <Carousel opts={{ align: "start" }} className="w-full mx-auto">
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className="py-4">
            {testimonials?.map((testimonial) => (
              <CarouselItem
                key={testimonial?.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
              >
                <div className="max-w-sm w-full">
                  <blockquote className="rounded-lg bg-gray-50 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-4">
                      <Image
                        alt="user"
                        src={testimonial?.user?.profile_picture}
                        width="56"
                        height="56"
                        className="size-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="mt-0.5 text-lg font-medium text-gray-900">
                          {testimonial?.user?.firstName}{" "}
                          {testimonial?.user?.lastName}
                        </p>
                        <div className="flex justify-start gap-0.5 text-yellow-600">
                          <StarRating rating={testimonial?.rating} />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 text-left leading-relaxed">
                      {testimonial?.content}
                    </p>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default CourseTestimonial;

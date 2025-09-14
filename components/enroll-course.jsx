// // "use client";

// // import { ArrowRight } from "lucide-react";
// // import { buttonVariants } from "./ui/button";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { createCheckOutSession } from "@/app/actions/stripe";

// // export const EnrollCourse = ({ asLink }) => {
// //   // formaction
// //   const formAction = async (data) => {
// //     const { url } = await createCheckOutSession(data);
// //     window.location.assign(url);
// //   };

// //   return (
// //     <>
// //       <form action={formAction}>
// //         {asLink ? (
// //           <Button
// //             type="submit"
// //             variant="ghost"
// //             className="text-xs text-sky-700 h-7 gap-1 cursor-pointer"
// //           >
// //             Enroll
// //             <ArrowRight className="w-3" />
// //           </Button>
// //         ) : (
// //           <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
// //             Enroll Now
// //           </Button>
// //         )}
// //       </form>
// //     </>
// //   );
// // };

"use client";

import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe";

const EnrollCourse = ({ asLink, course }) => {
  // const handleCheckout = async (e) => {
  //   e.preventDefault();
  //   const { url } = await createCheckoutSession();
  //   window.location.href = url; // 👈 Stripe Checkout e redirect
  // };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { url } = await createCheckoutSession(formData);
    window.location.href = url;
  };

  return (
    <form onSubmit={handleCheckout}>
      <input type="hidden" name="courseId" value={course?.id} />
      {/* <input type="hidden" name="courseName" value={course?.title} />
      <input type="hidden" name="coursePrice" value={course?.price} /> */}
      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1 cursor-pointer"
        >
          Enroll
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          Enroll Now
        </Button>
      )}
    </form>
  );
};

export default EnrollCourse;

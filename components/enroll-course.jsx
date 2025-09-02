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

// "use client";

// import { ArrowRight } from "lucide-react";
// import { buttonVariants } from "./ui/button";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { createCheckoutSession } from "@/app/actions/stripe";

// const EnrollCourse = ({ asLink }) => {
//   return (
//     <form action={createCheckoutSession}>
//       {asLink ? (
//         <Button
//           type="submit"
//           variant="ghost"
//           className="text-xs text-sky-700 h-7 gap-1 cursor-pointer"
//         >
//           Enroll
//           <ArrowRight className="w-3" />
//         </Button>
//       ) : (
//         <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
//           Enroll Now
//         </Button>
//       )}
//     </form>
//   );
// };

// export default EnrollCourse;

"use client";

import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe";

const EnrollCourse = ({ asLink }) => {
  const handleCheckout = async (e) => {
    e.preventDefault();
    const { url } = await createCheckoutSession();
    window.location.href = url; // 👈 Stripe Checkout e redirect
  };

  return (
    <form onSubmit={handleCheckout}>
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

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCourseDetailsById } from "@/quires/courses";
import { getUserByEmail } from "@/quires/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { sendEmails } from "@/lib/emails";
import { enrollForCourse } from "@/quires/enrollments";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id)
    throw new Error("Please provide a valid session id that start cs_");

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseDetailsById(courseId);

  const loggedInUser = await getUserByEmail(userSession?.user?.email);

  if (!loggedInUser) {
    console.log("User not found or not logged in");
  }

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  if (paymentStatus === "succeeded") {
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      "stripe"
    );

    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;
    // send email

    const emailToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}`,
        message: `Congratulation, ${instructorName}, A new student ${customerName} has enroll to your course ${productName} just now`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey, ${customerName}, You have sucessfully enrolled for  ${productName}`,
      },
    ];

    const emailSendResponse = await sendEmails(emailToSend);
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-500">
              <CircleCheck className="w-20 h-20 text-white" />
            </div>

            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations! <strong> {customerName} </strong>, Your
              Enrollment was Successfull for <strong> {productName} </strong>
            </h1>
          </>
        )}

        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;

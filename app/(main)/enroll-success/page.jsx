import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {/* ✅ Circle background + white tick */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-500">
          <CircleCheck className="w-20 h-20 text-white" />
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! Your Enrollment was Successful
        </h1>

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

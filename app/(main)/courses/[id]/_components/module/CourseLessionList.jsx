import { getLessions } from "@/quires/lesson";
import { cn } from "@/lib/utils";
import { Tv } from "lucide-react";

const CourseLessionList = async ({ lesson }) => {
  const lessonData = await getLessions(lesson.id);

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] transition-all hover:text-slate-600 w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className="text-slate-500" />
        {lessonData?.title}
      </div>
    </button>
  );
};

export default CourseLessionList;

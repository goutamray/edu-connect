import { getLessions } from "@/quires/lesson";
import { cn } from "@/lib/utils";
import { Tv } from "lucide-react";

const CourseLessionList = async ({ lessonId }) => {
  const lesson = await getLessions(lessonId);

  if (!lesson) {
    return <p className="text-slate-400 text-sm">Lesson not found</p>;
  }

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] transition-all hover:text-slate-600 w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className="text-slate-500" />
        {lesson.title}
      </div>
    </button>
  );
};

export default CourseLessionList;

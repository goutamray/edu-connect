import { Radio } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import { NotepadText } from "lucide-react";
import { FileQuestion } from "lucide-react";

import CourseLessionList from "./CourseLessionList";

const CourseModuleList = ({ module }) => {
  return (
    <>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger>{module?.title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              {(module?.duration / 60).toPrecision(2)} Lessons
            </span>
            <span className="flex items-center gap-1.5">
              <NotepadText className="w-4 h-4" />
              10 Notes
            </span>
            <span className="flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4" />
              10 Quiz
            </span>
            <span className="flex items-center gap-1.5">
              <Radio className="w-4 h-4" />1 Live Class
            </span>
          </div>

          <div className="space-y-3">
            {/* {module?.lessonIds &&
              module?.lessonIds?.map((lessonId) => {
                console.log(lessonId);

                return (
                  <CourseLessionList lessionId={lessonId} key={lessonId} />
                );
              })} */}

            {module?.lessonIds?.map((lessonId) => {
              const id = lessonId.toString(); // ✅ force string
              return <CourseLessionList lessonId={id} key={id} />;
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default CourseModuleList;

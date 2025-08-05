import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Lock, PlayCircle } from "lucide-react";

const CourseContent = ({ lectures }) => (
  <Card>
    <CardHeader>
      <CardTitle>Course Content</CardTitle>
      <CardDescription>{lectures.length} lectures</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {lectures.map((lecture, idx) => (
        <div key={idx} className="flex items-center gap-3 text-sm">
          <span>
            {lecture.isPreviewFree ? (
              <PlayCircle size={14} />
            ) : (
              <Lock size={14} />
            )}
          </span>
          <p>{lecture.lectureTitle}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default CourseContent;

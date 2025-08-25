import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CirclePlay } from "lucide-react";

const LectureSidebar = ({
  lectures,
  currentLecture,
  onSelect,
  isLectureCompleted,
}) => (
  <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
    <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
    <div className="flex-1 overflow-y-auto">
      {lectures.map((lecture) => (
        <Card
          key={lecture._id}
          className={`mb-3 hover:cursor-pointer transition transform ${
            lecture._id === currentLecture?._id
              ? "bg-gray-200 dark:dark:bg-gray-800"
              : ""
          }`}
          onClick={() => onSelect(lecture)}
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {isLectureCompleted(lecture._id) ? (
                <CheckCircle2 size={24} className="text-green-500 mr-2" />
              ) : (
                <CirclePlay size={24} className="text-gray-500 mr-2" />
              )}
              <CardTitle className="text-lg font-medium">
                {lecture.lectureTitle}
              </CardTitle>
            </div>
            {isLectureCompleted(lecture._id) && (
              <Badge variant="outline" className="bg-green-200 text-green-600">
                Completed
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default LectureSidebar;

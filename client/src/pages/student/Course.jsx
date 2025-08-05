import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Link } from "react-router-dom";

const Course = ({ course }) => {
  console.log("course", course);

  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
        {/* Image + Discount Badge */}
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />

          {(course.discountPercent && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className=" bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-clip rounded-full shadow-md transition-colors duration-350">
                {course.discountPercent}% OFF
              </Badge>
            </div>
          )) ||
            ""}
        </div>

        {/* Card Content */}
        <CardContent className="px-5 py-4 space-y-3">
          {/* Course Title */}
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.courseTitle || "No Title"}
          </h1>

          {/* Creator Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt={course.creator?.name || "creator"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">
                {course.creator?.name || "Unknown"}
              </h1>
            </div>

            {/* Course Level Badge */}
            {course.courseLevel && (
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded-full transition-colors duration-300">
                {course.courseLevel}
              </Badge>
            )}
          </div>

          {/* Price Section */}
          <div className="text-lg font-bold flex items-center gap-3 mt-2">
            ₹{course.coursePrice || 0}
            {course.couponCode && (
              <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 text-xs rounded-full shadow-sm transition-all duration-300">
                {course.couponCode}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;

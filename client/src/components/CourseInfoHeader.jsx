const CourseInfoHeader = ({ course }) => {
  return (
    <div className="bg-[#2D2F31] text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-3xl">
          {course?.courseTitle}
        </h1>
        <p className="text-base md:text-lg">Course Sub-title</p>
        <p>
          Created By{" "}
          <span className="text-[#C0C4FC] underline italic">
            {course?.creator.name}
          </span>
        </p>
        <div className="flex items-center gap-2 text-sm">
          <p>Last updated {course?.createdAt?.split("T")[0]}</p>
        </div>
        <p>Students enrolled: {course?.enrolledStudents?.length}</p>
      </div>
    </div>
  );
};

export default CourseInfoHeader;

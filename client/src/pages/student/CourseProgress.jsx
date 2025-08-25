import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "@/features/api/commentApi";
import VideoSection from "@/components/CourseProgress/VideoSection";
import CommentsSection from "@/components/CourseProgress/CommentsSection";
import LectureSidebar from "@/components/CourseProgress/LectureSidebar";
import { CheckCircle } from "lucide-react";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { isLoading: completing, isSuccess: completeSuccess, data: completeData },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    {
      isLoading: inCompleting,
      isSuccess: incompleteSuccess,
      data: incompleteData,
    },
  ] = useInCompleteCourseMutation();

  const initialLecture = data?.data?.courseDetails?.lectures?.[0];
  const currentLectureId = currentLecture?._id || initialLecture?._id;

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery(currentLectureId, { skip: !currentLectureId });

  useEffect(() => {
    if (completeSuccess) {
      refetch();
      toast.success(completeData?.message || "Course marked as complete");
    }
    if (incompleteSuccess) {
      refetch();
      toast.success(incompleteData?.message || "Course marked as incomplete");
    }
  }, [completeSuccess, incompleteSuccess]);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError)
    return <div className="p-8 text-red-500">Failed to load course</div>;

  const { courseDetails, progress, completed } = data.data;

  const isLectureCompleted = (id) =>
    progress.some((p) => p.lectureId === id && p.viewed);

  const handleLectureProgress = async (id) => {
    await updateLectureProgress({ courseId, lectureId: id });
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <Button
          onClick={
            completed
              ? () => inCompleteCourse(courseId)
              : () => completeCourse(courseId)
          }
          variant={completed ? "outline" : "default"}
          disabled={completing || inCompleting}
        >
          {completing || inCompleting ? (
            "Processing..."
          ) : completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> Completed
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Video + Comments */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <VideoSection
            lecture={currentLecture}
            initialLecture={initialLecture}
            onProgress={handleLectureProgress}
          />
          <CommentsSection
            lectureId={currentLectureId}
            commentsData={commentsData}
            loading={commentsLoading}
            onRefresh={refetch}
          />
        </div>

        {/* Right: Sidebar */}
        <LectureSidebar
          lectures={courseDetails.lectures}
          currentLecture={currentLecture}
          onSelect={(lec) => {
            setCurrentLecture(lec);
            handleLectureProgress(lec._id);
          }}
          isLectureCompleted={isLectureCompleted}
        />
      </div>
    </div>
  );
};

export default CourseProgress;

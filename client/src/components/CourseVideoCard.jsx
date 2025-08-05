import ReactPlayer from "react-player";

const CourseVideoCard = ({ videoUrl }) => (
  <div className="w-full aspect-video mb-4">
    <ReactPlayer width="100%" height="100%" url={videoUrl} controls />
  </div>
);

export default CourseVideoCard;

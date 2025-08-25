import React from "react";

const VideoSection = ({ lecture, initialLecture, onProgress }) => (
  <div>
    <video
      src={lecture?.videoUrl || initialLecture.videoUrl}
      controls
      className="w-full h-auto md:rounded-lg"
      onPlay={() => onProgress(lecture?._id || initialLecture._id)}
    />
    <div className="mt-2">
      <h3 className="font-medium text-lg">
        {`Lecture ${(lecture?.index ?? 0) + 1} : ${
          lecture?.lectureTitle || initialLecture.lectureTitle
        }`}
      </h3>
    </div>
  </div>
);

export default VideoSection;

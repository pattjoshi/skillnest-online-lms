const CourseDescription = ({ description }) => (
  <div className="w-full lg:w-1/2 space-y-5">
    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
    <p className="text-sm" dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

export default CourseDescription;

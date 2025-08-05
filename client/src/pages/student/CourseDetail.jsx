import {
  useCheckCouponCodeMutation,
  useGetCourseDetailWithStatusQuery,
} from "@/features/api/purchaseApi";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import CourseInfoHeader from "@/components/CourseInfoHeader";
import CourseDescription from "@/components/CourseDescription";
import CourseContent from "@/components/CourseContent";
import CourseVideoCard from "@/components/CourseVideoCard";
import CouponForm from "@/components/CouponForm";
import ContinueOrBuyButton from "@/components/ContinueOrBuyButton";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const [
    applyCouponCode,
    {
      isLoading: isCouponLoading,
      isSuccess: isCouponSuccess,
      data: couponData,
    },
  ] = useCheckCouponCodeMutation();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    navigate(`/course-progress/${courseId}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(course?.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code.");
      return;
    }
    try {
      const response = await applyCouponCode({ courseId, couponCode }).unwrap();
      setDiscountAmount(response.discountAmount);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply coupon.");
    }
  };

  return (
    <div className="space-y-5">
      <CourseInfoHeader course={course} />
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <CourseDescription description={course.description} />
          <CourseContent lectures={course.lectures} />
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <CourseVideoCard videoUrl={course.lectures[0].videoUrl} />
              {!purchased && (
                <CouponForm
                  course={course}
                  copied={copied}
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  onCopy={handleCopy}
                  onApplyCoupon={handleApplyCoupon}
                  isLoading={isCouponLoading}
                  isCouponSuccess={isCouponSuccess}
                  couponData={couponData}
                  discountAmount={discountAmount}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              <ContinueOrBuyButton
                purchased={purchased}
                onContinue={handleContinueCourse}
                courseId={courseId}
                couponCode={couponCode}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

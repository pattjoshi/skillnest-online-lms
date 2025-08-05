import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/BuyCourseButton";

const ContinueOrBuyButton = ({
  purchased,
  onContinue,
  courseId,
  couponCode,
}) => {
  return purchased ? (
    <Button onClick={onContinue} className="w-full">
      Continue Course
    </Button>
  ) : (
    <BuyCourseButton courseId={courseId} couponCode={couponCode} />
  );
};

export default ContinueOrBuyButton;

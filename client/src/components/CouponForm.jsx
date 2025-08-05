import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const CouponForm = ({
  couponCode,
  setCouponCode,
  isLoading,
  course,
  copied,
  onCopy,
  onApplyCoupon,
  isCouponSuccess,
  couponData,
  discountAmount,
}) => {
  return (
    <>
      <h1 className="text-lg md:text-xl font-semibold">
        Course Price ₹{" "}
        {isCouponSuccess && couponData?.valid
          ? discountAmount
          : course?.coursePrice}
      </h1>

      <h1>
        Apply coupon code to{" "}
        <span className="font-semibold text-green-600">
          {course?.discountPercent}%
        </span>{" "}
        off{" "}
        <button
          onClick={onCopy}
          className="ml-2 px-2 py-1 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition"
        >
          {course?.couponCode}
        </button>
        {copied && <span className="ml-2 text-sm text-green-600">Copied!</span>}
      </h1>

      <Separator className="my-2" />

      <div className="flex space-x-11 mr-auto mt-2">
        <Input
          className="w-1/3"
          value={couponCode}
          placeholder="SAVE50"
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button onClick={onApplyCoupon} disabled={isLoading}>
          {isLoading ? "Applying..." : "Apply Coupon"}
        </Button>
      </div>
    </>
  );
};

export default CouponForm;

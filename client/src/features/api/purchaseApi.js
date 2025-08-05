import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = `${import.meta.env.VITE_BACKEND_BASE_URL}purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkCouponCode: builder.mutation({
      query: ({ courseId, couponCode }) => ({
        url: "/checkout/check-coupon",
        method: "POST",
        body: { courseId, couponCode },
      }),
    }),

    createCheckoutSession: builder.mutation({
      query: ({ courseId, couponCode }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId, couponCode },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCheckCouponCodeMutation,
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;

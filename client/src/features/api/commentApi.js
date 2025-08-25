import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = `${import.meta.env.VITE_BACKEND_BASE_URL}comments`;

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ lectureId, content, parentId }) => ({
        url: "/create",
        method: "POST",
        body: {
          lectureId,
          content,
          parentId,
        },
      }),
      invalidatesTags: (result, error, { lectureId }) => [
        { type: "Comments", id: lectureId },
      ],
    }),
    getComments: builder.query({
      query: (lectureId) => `/${lectureId}`,
      providesTags: (result, error, lectureId) => [
        { type: "Comments", id: lectureId },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { lectureId }) => [
        { type: "Comments", id: lectureId },
      ],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = commentsApi;

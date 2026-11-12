import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_CORS_ORIGIN}/api/orders` }),
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    
    fetchUserOrders: builder.query({
      query: (userId: string) => `/user-orders/${userId}`,
      providesTags: ["Order"],
    }),

    placeOrder: builder.mutation({
      query: (orderData: any) => ({
        url: "/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"], 
    }),

    getOrderById: builder.query({
      query: (orderId: string) => `/single-order/${orderId}`,
      providesTags: ["Order"],
    }),

     deleteOrder: builder.mutation({
      query: ({ orderId, userId }) => ({
        url: `/delete-order/${orderId}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Order"], 
    }),

  }),
});


export const { 
  useFetchUserOrdersQuery, 
  usePlaceOrderMutation,
  useGetOrderByIdQuery ,
  useDeleteOrderMutation
} = orderApi;
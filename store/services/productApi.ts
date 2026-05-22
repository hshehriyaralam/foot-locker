import { createApi,  fetchBaseQuery } from "@reduxjs/toolkit/query/react";







export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes : ["Product"],
  


  endpoints: (builder) => ({
    // fetch all products
    fetchProducts: builder.query({
      query: () => "fetch-products",
      providesTags: ["Product"],
    }),

    // fetch single product
    singleProduct: builder.query({
        query : (id: any) => `single-product/${id}`,
        providesTags: ["Product"],
    }),
  }),
});

export const {useFetchProductsQuery, useSingleProductQuery} = productApi



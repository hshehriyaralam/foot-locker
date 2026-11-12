"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, PackageOpen, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFetchUserOrdersQuery } from "@/store/services/orderApi";

const Order = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  
  // ✅ User data ke sath loading state bhi nikalein
  const { profile, loading: userLoading } = useSelector((state: RootState) => state.user);

  // ✅ Agar user load ho raha hai, toh API call skip karo, jab load ho jaye tab call karo
  const { data: orders, isLoading: ordersLoading, isError } = useFetchUserOrdersQuery(profile?.id, {
    skip: !profile?.id, 
  });

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
      case "in transit":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return "In-Progress";
    return status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("-");
  };

  const filteredOrders = orders?.filter((order: any) => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Delivered") return order.status?.toLowerCase() === "delivered";
    if (activeTab === "In-Progress") return order.status?.toLowerCase() === "in-progress";
    return true;
  }) || [];

  // 🚀 1. LOADING STATE (Jab tak user verify nahi hota)
  if (userLoading || ordersLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 font-maven">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-gray-600 font-semibold">Loading your orders...</p>
      </div>
    );
  }

  // 🚀 2. NOT LOGGED IN / ERROR STATE (Ab yeh tabhi aayega jab loading complete ho jaye)
  if (!profile || isError) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 font-maven">
        <AlertCircle size={60} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6 text-center">
          {isError ? "Something went wrong while fetching orders." : "Please login to view your orders."}
        </p>
        <Link href="/login">
          <Button className="rounded-none bg-black text-white font-semibold h-12 px-8">
            Login Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 font-maven pb-20">
      {/* Top Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">
            Check the status of your recent orders and track shipments.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b mb-8 scrollbar-hide">
          {["All Orders", "In-Progress", "Delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-3 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm"
              >
                {/* Order Card Header */}
                <div className="bg-gray-50 px-4 lg:px-6 py-4 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4 lg:gap-8 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Order Placed</p>
                      <p className="font-semibold text-black">
                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Total Amount</p>
                      <p className="font-semibold text-black">
                        £{Number(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Order ID</p>
                      <p className="font-semibold text-black truncate max-w-[120px]">
                        #{order.order_number || order.id.slice(0, 8)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Payment Method</p>
                      <p className="font-semibold text-black">
                        {order.payment_method === "COD" ? "Cash on Delivery" : order.payment_method}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 lg:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.order_items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 lg:p-6 flex flex-col sm:flex-row gap-4 lg:gap-6"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center p-2">
                        <Image
                          src={item.image_url?.[0] || "/newAt.webp"} 
                          alt={item.name}
                          width={100}
                          height={100}
                          className="object-contain mix-blend-multiply"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-bold text-black mb-1">
                                {item.name}
                              </h3>
                              {item.brand && (
                                <p className="text-gray-600 text-sm mb-1">{item.brand}</p>
                              )}
                              {item.size && item.size !== "N/A" && (
                                <p className="text-gray-600 text-sm">Size: {item.size}</p>
                              )}
                            </div>
                            <div className="text-right whitespace-nowrap">
                              <p className="text-lg font-bold text-black">
                                £{Number(item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions & Qty */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 gap-4 sm:gap-0">
                          <p className="text-sm font-medium text-gray-700">
                            Qty: <span className="text-black">{item.quantity}</span>
                          </p>
                          
                          <div className="flex flex-wrap gap-3">
                            <Link href={`/products/${item.product_id}`}>
                              <Button className="rounded-none bg-black text-white font-semibold h-10 px-4 text-xs lg:text-sm hover:bg-gray-800  cursor-pointer">
                                View Product
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Card Footer */}
                <div className="bg-white px-4 lg:px-6 py-4 border-t flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Arrives in Standard (2-6 Working Days)
                  </div>
                  <Link
                    href={`/order/details/${order.id}`}
                    className="text-sm font-semibold underline flex items-center gap-1 hover:text-gray-700"
                  >
                    View Order Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white border rounded-lg px-4 text-center">
            <PackageOpen size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">
              No orders found
            </h2>
            <p className="text-gray-500 mb-6">
              {activeTab === "All Orders" 
                ? "You haven't placed any orders yet." 
                : `You don't have any ${activeTab.toLowerCase()} orders.`}
            </p>
            <Link href="/">
              <Button className="rounded-none bg-black text-white font-semibold h-12 px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
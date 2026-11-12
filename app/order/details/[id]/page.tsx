"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, Package, Truck, CheckCircle2, MapPin, CreditCard,
  Loader2, AlertCircle, Trash2, X, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrderByIdQuery, useDeleteOrderMutation } from "@/store/services/orderApi";
import OrderSummary from "@/components/cart/orderSummary";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";

const OrderDetails = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const { profile } = useSelector((state: RootState) => state.user);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const getStatusStep = (status: string) => {
    if (status?.toLowerCase() === "delivered") return 3;
    if (status?.toLowerCase() === "in-progress") return 2;
    return 1;
  };

  const confirmDeleteOrder = async () => {
    try {
      await deleteOrder({ orderId: order.id, userId: profile.id }).unwrap();
      toast.success("Order deleted successfully!");
      setIsDeleteModalOpen(false);
      router.push("/order");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete order.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-gray-600 font-semibold">Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle size={60} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6 text-center">We couldn't find the order you're looking for.</p>
        <Button onClick={() => router.push("/order")} className="rounded-none bg-black text-white">
          Back to Orders
        </Button>
      </div>
    );
  }

  const currentStep = getStatusStep(order.status);
  const totalQuantity = order.order_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <div className="w-full min-h-screen bg-gray-50 font-maven pb-20 relative">
      
      {/* ... (Aapka baaki page ka code waisa hi rahega, maine sirf Modal fix kiya hai) ... */}
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
          <Link href="/order" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4 transition-colors">
            <ChevronLeft size={16} /> Back to My Orders
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">Order Details</h1>
              <p className="text-gray-600 flex items-center gap-2 flex-wrap">
                Order ID: <span className="font-semibold text-black">#{order.order_number || order.id.slice(0, 8)}</span>
                <span className="hidden sm:inline text-gray-300">|</span>
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${
                order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'
              }`}>
                {order.status === 'delivered' ? "Delivered" : "In Progress"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline & Items (Aapka code yahan aayega) */}
             <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Order Status</h3>
              <div className="flex flex-col sm:flex-row justify-between relative">
                <div className="hidden sm:block absolute top-5 left-[10%] right-[10%] h-1 bg-gray-200 -z-10 rounded-full"></div>
                <div className="hidden sm:block absolute top-5 left-[10%] h-1 bg-black -z-10 rounded-full transition-all duration-500" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '40%' : '80%' }}></div>
                <div className="flex flex-col sm:items-center gap-2 mb-6 sm:mb-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"><Package size={20} /></div>
                  <div className="sm:text-center"><p className="font-semibold text-sm">Order Placed</p><p className="text-xs text-gray-500">{formatDate(order.created_at).split(",")[0]}</p></div>
                </div>
                <div className="flex flex-col sm:items-center gap-2 mb-6 sm:mb-0 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}><Truck size={20} /></div>
                  <div className="sm:text-center"><p className={`font-semibold text-sm ${currentStep >= 2 ? 'text-black' : 'text-gray-400'}`}>Processing</p><p className="text-xs text-gray-500">In Progress</p></div>
                </div>
                <div className="flex flex-col sm:items-center gap-2 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}><CheckCircle2 size={20} /></div>
                  <div className="sm:text-center"><p className={`font-semibold text-sm ${currentStep >= 3 ? 'text-black' : 'text-gray-400'}`}>Delivered</p><p className="text-xs text-gray-500">Expected in 6 days</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <OrderSummary totalQuantity={totalQuantity} totalPrice={order.total_amount} />
            
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-4"><MapPin size={20} className="text-gray-700" /><h3 className="font-bold text-lg">Shipping Address</h3></div>
                {order.shipping_address ? (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-semibold text-black">{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                    <p>{order.shipping_address.address1 || "Address Line 1"}</p>
                    {order.shipping_address.address2 && <p>{order.shipping_address.address2}</p>}
                    <p>{order.shipping_address.city}, {order.shipping_address.postalCode}</p>
                  </div>
                ) : (<p className="text-sm text-gray-500">No address provided.</p>)}
              </div>
              <div className="border-t my-5"></div>
              <div>
                <div className="flex items-center gap-2 mb-4"><CreditCard size={20} className="text-gray-700" /><h3 className="font-bold text-lg">Payment Method</h3></div>
                <p className="text-sm font-semibold text-black">{order.payment_method === "COD" ? "Cash on Delivery" : order.payment_method}</p>
                <p className="text-xs text-gray-500 mt-1">{order.payment_method === "COD" ? "Pay when your order arrives." : "Card payment processed."}</p>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm border-red-100">
              <Button onClick={() => setIsDeleteModalOpen(true)} variant="outline" className="w-full rounded-none border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600 font-semibold h-11 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Trash2 size={18} /> Delete Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 🚨 CUSTOM DELETE MODAL (FIXED UI) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
          ></div>
          
          {/* Modal Content Box */}
          <div className="relative bg-white w-full max-w-[440px] p-6 sm:p-8 shadow-2xl rounded-none animate-in fade-in zoom-in-95 duration-200 z-10">
            
            {/* Close (X) Button */}
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Warning Icon */}
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5 border border-red-100">
              <AlertTriangle size={28} className="text-red-600" />
            </div>

            {/* Text Content */}
            <h2 className="text-2xl font-bold text-black mb-2 font-maven">Delete this order?</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete order <span className="font-semibold text-black">#{order.order_number || order.id.slice(0, 8)}</span>? 
              This action is permanent and cannot be undone.
            </p>

            {/* Action Buttons - FIXED FLEX/GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="w-full rounded-none border-gray-300 text-black font-semibold h-11 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </Button>
              
              <Button
                type="button"
                onClick={confirmDeleteOrder}
                disabled={isDeleting}
                className="w-full rounded-none bg-red-600 hover:bg-red-700 text-white font-semibold h-11 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} /> Yes, Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
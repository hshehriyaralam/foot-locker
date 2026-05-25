"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUserProfile } from "@/store/userSlice";
import { useEffect } from "react";





export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return <>{children}</>;
}
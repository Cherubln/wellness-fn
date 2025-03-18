/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  IServiceProvider,
  IUser,
} from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { AppDispatch, RootState } from "../store";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  // get user from using the useSelector function
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") as string;
      // decode token to get _id

      const decodedToken = jwtDecode<IUser | IServiceProvider>(token);
      const userId = decodedToken._id!;

      // call getUserById from authSlice
      await dispatch(getUserById(userId));
    };
    if (!user._id) fetchData();
  }, [dispatch]);
};

export default useAuth;

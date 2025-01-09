"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  IServiceProvider,
  IUser,
  setAuthState,
} from "../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwtDecode<IUser | IServiceProvider>(token);
      dispatch(setAuthState({ isAuthenticated: true, token, user }));
    }
  }, [dispatch]);
};

export default useAuth;

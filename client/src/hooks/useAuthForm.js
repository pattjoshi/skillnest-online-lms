// src/hooks/useAuthForm.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";

export const useAuthForm = (roleFromURL, formType) => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    role: roleFromURL || "student",
  });

  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const action = formType === "signup" ? registerUser : loginUser;
    await action(formInput);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData)
      toast.success(registerData.message || "Signup successful.");
    if (registerError)
      toast.error(registerError?.data?.message || "Signup failed.");

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) toast.error(loginError?.data?.message || "Login failed.");
  }, [registerData, loginData, registerError, loginError]);

  return {
    formInput,
    handleChange,
    handleSubmit,
    loginIsLoading,
    registerIsLoading,
  };
};

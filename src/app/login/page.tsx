"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disabledButton, setDisabledButton] = useState(true);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login Successfull!");
      console.log(response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed: ", error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border-gray-300 bg-gray-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border-gray-300 bg-gray-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />
      {disabledButton ? (
        <button className="p-2 border-gray-300 bg-red-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          No Login
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="p-2 border-gray-300 bg-gray-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login here
        </button>
      )}
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}

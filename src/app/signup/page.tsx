"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signed up Successfully!");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed: ", error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-gray-300 bg-gray-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Username"
      />
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
      {buttonDisabled ? (
        <button
          onClick={onSignup}
          className="p-2 border-gray-300 bg-red-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          No Signup
        </button>
      ) : (
        <button
          onClick={onSignup}
          className="p-2 border-gray-300 bg-gray-500 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup
        </button>
      )}

      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}

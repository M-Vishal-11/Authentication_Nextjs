"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [data, setData] = useState("nothing");

  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  const getUserData = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 m-2 text-lg rounded bg-green-300">
        {data == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-300 text-black hover:bg-blue-500 active:bg-blue-500 text-xl font-bold py-2 px-4 m-2 rounded-lg 
      transform hover:scale-120 transition-all delay-75 duration-150 ease-in"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className="bg-green-300 text-black hover:bg-green-500 active:bg-green-500 text-xl font-bold py-2 px-4 m-2 rounded-lg 
      transform hover:scale-120 transition-all delay-75 duration-150 ease-in"
      >
        Get User Details
      </button>
    </div>
  );
}

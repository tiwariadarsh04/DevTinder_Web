import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Loading from "./Loading";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user?.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (user) {
        setLoading(false);
        return;
      }
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res.status === 200 && res.data) {
        dispatch(addUser(res.data));
      }
    } catch (error) {
      console.log("Guest Mode Active: No session found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white font-sans">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
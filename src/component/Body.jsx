import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Loading from "./Loading";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user?.user);
  const [loading, setLoading] = useState(true); // 👈 Loading State Add ki

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // User logged in hai -> Redux me update karo
      dispatch(addUser(res.data));
    } catch (err) {
      console.log("Guest Mode Active: No active session");
      // Agar 401 aaya toh app crash mat hone do, guest mode rehne do
    } finally {
      setLoading(false); // 👈 Profile check hone ke baad loading stop
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 👈 Reload hone par jab tak auth re-verify na ho, Spinner dikhao (White screen nahi)
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
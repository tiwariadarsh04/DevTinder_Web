import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, PROFILE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const isUser = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <div className="navbar bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 px-4 md:px-8">
      <div className="flex-1">
        <Link to={"/"} className="flex items-center gap-2 text-xl font-black tracking-tight text-white hover:opacity-90">
          <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">DevTinder</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-medium">v2.0</span>
        </Link>
      </div>

      <div className="flex-none gap-4">
        {isUser ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300 hidden md:block">
              Welcome, <span className="text-white font-semibold">{isUser?.firstName}</span>
            </span>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-sky-500/30 ring-offset-2 ring-offset-slate-900 hover:ring-sky-400"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={isUser?.photoUrl || PROFILE_URL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-900 border border-slate-800 rounded-2xl z-[1] mt-3 w-56 p-2 shadow-2xl text-slate-200"
              >
                <li>
                  <Link to={"/premium"} className="justify-between text-sky-400 font-semibold">
                    Premium Membership
                    <span className="badge badge-sm badge-info">PRO</span>
                  </Link>
                </li>
                <div className="divider my-1 border-slate-800"></div>
                <li><Link to={"/profile"}>Edit Profile</Link></li>
                <li><Link to={"/requests"}>Connection Requests</Link></li>
                <li><Link to={"/connections"}>My Connections</Link></li>
                <div className="divider my-1 border-slate-800"></div>
                <li><button onClick={handleLogout} className="text-rose-400 hover:text-rose-300">Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium hidden sm:inline-block">
              👀 Guest Mode
            </span>
            <Link
              to="/login"
              className="btn btn-sm md:btn-md bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 border-none text-white font-bold rounded-xl shadow-lg shadow-sky-500/20"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
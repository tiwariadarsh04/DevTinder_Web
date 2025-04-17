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
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      // Error Logic
    }
  };

  if (!isUser) {
    console.log("User is null :", isUser);
    return;
  } else {
    console.log("User is :", isUser);
  }

  return (
    <div className="navbar bg-base-300 stiky">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <p>Welcome {isUser?.firstName}</p>
        </div>

        {isUser && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={isUser?.photoUrl || PROFILE_URL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/premium"} className="justify-between">
                  Premium
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

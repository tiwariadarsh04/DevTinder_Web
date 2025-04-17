import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Loading from "./Loading";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  const fetchUser = async () => {
    try {
      if (user) {
        return;
      }
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log("Error in fetching the user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <Loading />;

  return (
    <div className="w-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connections?.connections);
  // const curr_user = useSelector((store) => store?.user?.user);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      // ERROR
      console.log("Error in fetching Connections :", connections);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <Loading />;

  if (connections.length === 0)
    return (
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>You Haven't Received any Connections</span>
      </div>
    );

  return (
    <div>
      {/* Page Title */}
      <div className="flex justify-center">
        <h1 className="font-bold my-10 text-xl md:text-2xl">Connections</h1>
      </div>

      {/* Connections Container */}
      <div className="flex flex-col items-center">
        {connections.map((data) => {
          const {
            firstName,
            lastName,
            about,
            skills,
            _id,
            isPremium,
            photoUrl,
          } = data;
          return (
            <div
              key={data._id}
              className="card card-side bg-base-200 shadow-xl w-full md:w-3/4 lg:w-1/2 h-auto my-5 flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <figure className="w-full md:w-1/2 h-60 md:h-72">
                <img
                  className="w-full h-full object-cover"
                  src={
                    photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body p-4">
                <div className="flex">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  {isPremium && (
                    <img
                      className="h-8 w-8 ml-1"
                      src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                      alt="premium-memger"
                    ></img>
                  )}
                </div>
                {/* <p className="break-words">{skills?.join(" ")}</p> */}
                <p className="text-sm md:text-base">{about}</p>
                <div className="card-actions justify-end mt-4 space-x-2">
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary btn-sm md:btn-md">
                      Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

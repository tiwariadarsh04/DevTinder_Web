import axios from "axios";
import React from "react";
import { BASE_URL, PROFILE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, gender, about, isPremium, photoUrl } =
    user;

  const handleSendRequest = async (stauts, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + stauts + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (error) {
      // Error Logic
      console.log("Error in handling the send Request :", error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl my-5">
      <figure>
        <img src={photoUrl || PROFILE_URL} alt="photo" />
      </figure>
      <div className="card-body">
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
        {age && gender && <p>{age + ", " + gender}</p>}
        {/* <p className="break-words">{skills?.join(" ")}</p> */}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

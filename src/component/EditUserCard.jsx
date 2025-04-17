import axios from "axios";
import React from "react";
import { BASE_URL, BLUE_TICK_URL, PROFILE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const EditUserCard = ({ user }) => {
  const dispatch = useDispatch();
  const curr_user = useSelector((store) => store?.user?.user);
  const { _id, firstName, lastName, photoUrl, age, gender, about, userSkills } =
  curr_user;
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
          {curr_user?.isPremium && (
            <img
              className="h-8 w-8 ml-1"
              src={BLUE_TICK_URL}
              alt="premium-memger"
            ></img>
          )}
        </div>
        {age && gender && <p>{age + ", " + gender}</p>}
        {/* <p>{userSkills.join(" ")}</p> */}
        <p>{about}</p>
      </div>
    </div>
  );
};

export default EditUserCard;

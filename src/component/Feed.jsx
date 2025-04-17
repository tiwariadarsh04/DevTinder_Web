import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loading from "./Loading";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed?.feed);
  // console.log("Feed array is :",feed);
  const getFeed = async () => {
    try {
      // if (!feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log("Feed Response is :", res?.data.data);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      // Error Logic
      console.log("Errro in fetching Fedd :", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <Loading />;

  return (
    <div className="flex flex-col  items-center">
      {feed &&
        feed.map((data) => {
          return <UserCard key={data._id} user={data} />;
        })}
    </div>
  );
};

export default Feed;

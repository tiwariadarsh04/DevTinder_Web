import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loading from "./Loading";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed?.feed);
  const user = useSelector((store) => store.user?.user);
  const [guestFeed, setGuestFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      setLoading(true);
      if (user) {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res?.data?.data));
      } else {
        try {
          const publicRes = await axios.get(BASE_URL + "/feed/public");
          setGuestFeed(publicRes?.data?.data || []);
        } catch {
          const fallbackRes = await axios.get(BASE_URL + "/feed");
          setGuestFeed(fallbackRes?.data?.data || []);
        }
      }
    } catch (error) {
      console.log("Error loading feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  if (loading) return <Loading />;

  const displayFeed = user ? feed : guestFeed;

  if (!displayFeed || displayFeed.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h3 className="text-2xl font-bold text-white mb-2">No More Developer Profiles!</h3>
        <p className="text-slate-400">Check back later for new connections.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full my-4">
      {!user && (
        <div className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs md:text-sm font-medium px-4 py-2 rounded-full mb-4 text-center">
          ✨ You are browsing in Guest Mode — Click Interested to Sign In
        </div>
      )}
      
      {displayFeed.map((data) => (
        <UserCard key={data._id} user={data} />
      ))}
    </div>
  );
};

export default Feed;
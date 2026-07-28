import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loading from "./Loading";

// Sample Profiles shown exclusively during Guest Mode
const GUEST_MOCK_PROFILES = [
  {
    _id: "guest_demo_1",
    firstName: "Adarsh",
    lastName: "Tiwari",
    age: 23,
    gender: "Male",
    about: "Full Stack Developer building MERN applications & scalable cloud infrastructure. Open for collaborations!",
    isPremium: true,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"]
  },
  {
    _id: "guest_demo_2",
    firstName: "Priya",
    lastName: "Sharma",
    age: 24,
    gender: "Female",
    about: "Frontend Engineer passionate about UI/UX, animations, and clean React codebases.",
    isPremium: false,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    skills: ["React", "TypeScript", "Redux Toolkit", "Next.js"]
  },
  {
    _id: "guest_demo_3",
    firstName: "Rahul",
    lastName: "Verma",
    age: 25,
    gender: "Male",
    about: "Backend Lead specializing in microservices, System Design, Redis caching, and Docker.",
    isPremium: true,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    skills: ["Node.js", "System Design", "AWS", "Docker", "PostgreSQL"]
  }
];

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed?.feed);
  const user = useSelector((store) => store.user?.user);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      setLoading(true);
      // ONLY fetch from backend if user is authenticated
      if (user) {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res?.data?.data));
      }
    } catch (error) {
      console.log("Error fetching feed from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  if (loading) return <Loading />;

  // Render Redux feed for logged-in users, MOCK_PROFILES for guests
  const displayFeed = user ? feed : GUEST_MOCK_PROFILES;

  if (user && (!feed || feed.length === 0)) {
    return (
      <div className="text-center py-20 px-4">
        <h3 className="text-2xl font-bold text-white mb-2">No More Profiles Available!</h3>
        <p className="text-slate-400">You've reached the end of the feed. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full my-4">
      {!user && (
        <div className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs md:text-sm font-medium px-4 py-2 rounded-full mb-6 text-center shadow-lg shadow-sky-500/5">
          ✨ Browsing in Guest Mode — Click "Interested" to Sign In
        </div>
      )}
      
      {displayFeed && displayFeed.map((data) => (
        <UserCard key={data._id} user={data} />
      ))}
    </div>
  );
};

export default Feed;
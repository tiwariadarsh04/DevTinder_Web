import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, PROFILE_URL, BLUE_TICK_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./AuthModal";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const curr_user = useSelector((store) => store?.user?.user);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { _id, firstName, lastName, age, gender, about, isPremium, photoUrl, skills } = user;

  const handleSendRequest = async (status, targetId) => {
    if (!curr_user) {
      setShowAuthModal(true);
      return;
    }

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + targetId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(targetId));
    } catch (error) {
      console.log("Error sending request:", error);
    }
  };

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl my-6 backdrop-blur-xl hover:border-slate-700/80 transition-all duration-300">
        <div className="relative h-72 w-full bg-slate-950">
          <img 
            src={photoUrl || PROFILE_URL} 
            alt={firstName} 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">{firstName} {lastName}</h2>
              {isPremium && (
                <img className="h-6 w-6" src={BLUE_TICK_URL} alt="Verified Member" />
              )}
            </div>
            {age && gender && (
              <p className="text-xs font-semibold text-sky-400 mt-0.5 uppercase tracking-wider">
                {age} YRS • {gender}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 pt-2">
          <p className="text-slate-300 text-sm leading-relaxed mb-4 min-h-[48px]">
            {about || "Full-stack developer looking to build great projects together."}
          </p>

          {skills && (
            <div className="mb-6 flex flex-wrap gap-1.5">
              {Array.isArray(skills) ? (
                skills.map((skill, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 font-medium">
                  {skills}
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700/50 transition-all"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default UserCard;
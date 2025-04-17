import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import EditUserCard from "./EditUserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [showToast, setShowToast] = useState(false);
  const isPremium = user?.isPremium;
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  console.log("user skills is :", user?.skills);

  // const [userSkills, setUserSkills] = useState(
  //   user?.skills?.length === 0 ? [] : user?.skills[0].split(",")
  // );

  // user?.skill.length===0?[]:user?.skills[0].split(",")
  // user?.skills ? user?.skills[0].split(",") : []

  const [skills, setSkills] = useState([
    "javaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Tailwind",
    "Firebase",
    "C++",
    "C",
    "DSA",
    "Python",
    "Java",
  ]);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      // formData.append("skills", userSkills);
      // userSkills
      if (file) {
        formData.append("file", file); // Add the file to FormData
      }
      // { firstName, lastName, age, gender, about },

      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log("Error is :", err);
      setError(err?.response?.data);
    }
  };

  // const handleSkill = (skill) => {
  //   console.log("Skill is :", skill);
  //   setUserSkills((prev) => [...prev, skill]);
  //   const newSkill = skills.filter((currSkill) => {
  //     if (currSkill !== skill) {
  //       return currSkill;
  //     }
  //   });

  //   setSkills(newSkill);
  // };

  console.log("Skills array:", skills);
  // console.log("User skills array:", userSkills);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start my-10 gap-10">
        {/* Form Section */}
        <div className="w-full max-w-lg px-4">
          <div className="card bg-base-300 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-center">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                {/*  dropdown */}
                {/* <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Skills
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    {skills
                      .filter((skill) => !userSkills.includes(skill))
                      .map((skill) => (
                        <li key={skill} onClick={() => handleSkill(skill)}>
                          <p>{skill}</p>
                        </li>
                      ))}
                  </ul>
                </div> */}


                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                {/* file field */}
                <label className="form-control w-full my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input mt-4 file-input-bordered file-input-success w-full max-w-xs"
                  />
                </label>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md ">
          <EditUserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              // userSkills,
            }}
          />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

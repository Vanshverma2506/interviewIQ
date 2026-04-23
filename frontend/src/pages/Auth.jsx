import React, { useState } from "react";
import { FaRobot } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../Utils/Firebase";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userslice.js";

const Auth = ({ isModel = false }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      dispatch(setUserData(null));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full ${
        isModel
          ? "py-4"
          : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${
          isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded -[32px]"
        } bg-white shadow-2xl border border-gray-200`}
      >
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <FaRobot size={17} />
          </div>
          <h2 className="font-semibold text-lg">InterviewIQ.Ai</h2>
        </div>

        <h1 className="text-2xl md:-text-3xl font-semibold text-center mb-4 leading-snug">
          Continue With
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-3">
            <IoSparkles size={16} />
            Ai Smart Interview
          </span>
        </h1>

        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI-powerd mock interview , track your progress , and
          unlock detailed performence insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ opacity: 0, scale: 0.98 }}
          className="flex justify-center cursor-pointer items-center w-full gap-3 py-3 bg-black text-white rounded-full shadow-md"
        >
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Continue With Google"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
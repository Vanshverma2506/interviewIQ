import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import axios from "axios";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userslice";
import AuthModel from "./authModel";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopUp, setShowCreditPopUp] = useState(false);
  const [showUserPopUp, setShowUserPopUp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopUp(false);
      setShowUserPopUp(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-white bg-black p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="font-semibold hidden md:block text-lg">
            InterviewIQ.Ai
          </h1>
        </div>

        <div className="flex items-center gap-6 relative">

          {/* CREDIT BUTTON */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowCreditPopUp(!showCreditPopUp);
                setShowUserPopUp(false);
              }}
              className="flex gap-2 items-center bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 cursor-pointer transition"
            >
              <BsCoin size={20} />
              {userData?.credits || 0}
            </button>

            {showCreditPopUp && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
                <p className="text-sm mb-4 text-gray-600">
                  Need more Credit to Continue InterView?
                </p>
                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full bg-black cursor-pointer text-white py-2 rounded-lg text-sm"
                >
                  Buy more Credits
                </button>
              </div>
            )}
          </div>

          {/* USER BUTTON */}
          <div className="relative">
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                setShowUserPopUp(!showUserPopUp);
                setShowCreditPopUp(false);
              }}
              className="cursor-pointer w-8 h-8 flex bg-black text-white items-center justify-center rounded-full font-semibold"
            >
              {userData ? (
                userData?.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>

            {showUserPopUp && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                <p className="text-md text-blue-500 font-medium mb-1">
                  {userData?.name}
                </p>

                <button
                  onClick={() => navigate("/history")}
                  className="w-full text-left text-sm py-2 cursor-pointer hover:text-black text-gray-600"
                >
                  InterView History
                </button>

                <button
                  onClick={handleLogout}
                  className="text-left w-full text-red-500 cursor-pointer text-sm py-2 flex items-center gap-2"
                >
                  <HiOutlineLogout size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </motion.div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Navbar;
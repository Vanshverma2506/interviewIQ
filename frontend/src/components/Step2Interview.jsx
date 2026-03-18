import React from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  return (
    <div className="m-h-screen bg-linear-to-br from-emerald-50 via-white  to-teal-100 flex items-centers justify-center p-4 sm:p-6">
      <div className="w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col itmes-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={femaleVideo}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover "
            />
          </div>
          {/* subtitle pending */}
          {/* timer area */}
          <div className="w-full rounded-2xl max-w-md bg-white border border-gray-200 shadow-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Interview Status </span>
              <span className="text-sm font-semibold text-emerald-600">
                Ai Speaking
              </span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-center ">
              <Timer timeLeft="30" totalTime="60 " />
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="">1</span>
                <span></span>
              </div>
              <div>
                 <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;

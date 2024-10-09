import React from "react";
import NoInfo from "../assets/no-info.png";


const NotFound = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl mb-10">Not Found</h2>
        <img src={NoInfo} alt="No Info" width={200} height={200} />
      </div>
    </div>
  );
};

export default NotFound;

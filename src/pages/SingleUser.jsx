import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import Button from "../components/Button";

const SingleUser = () => {
  const { id } = useParams();
  const { students } = useContext(Context);
  const navigate = useNavigate()
  const user = students.find((user) => user.id === parseInt(id));

  if (!user) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="w-full flex items-center justify-between py-3 shadow-md">
        <div className="flex items-center gap-4">
          <Button onClick={()=> navigate(-1)} title={"Back"}/>
          <h2 className="text-2xl font-bold">{user.firstName}</h2>
        </div>
        <Button onClick={()=>navigate(`/students/${user.id}/update`)} title={"Update Student info"} type={"button"} />
      </div>
      <div className="bg-white p-8 w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {user.firstName} {user.lastName}
        </h1>
        <div className="text-lg text-gray-600 space-y-2">
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Student ID:</span> {user.studentId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

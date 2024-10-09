import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import Button from "../components/Button";
import { ProfileIconFIrst, ProfileIconSecond, ProfileIconThird } from "../assets/icons";

const TeacherSinglePage = () => {
  const { id } = useParams();
  const { teachers } = useContext(Context);
  const navigate = useNavigate();
  const user = teachers.find((user) => user.id === parseInt(id));
  console.log(user, id);

  if (!user) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        User not found
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="w-full flex items-center justify-between py-3 shadow-md">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} title={"Back"} />
          <h2 className="text-2xl font-bold">{user.firstName}</h2>
        </div>
        <Button
          onClick={() => navigate(`/teachers/${user.id}/update`)}
          title={"Update Teacher info"}
          type={"button"}
        />
      </div>
      <div className="bg-white p-8 w-full flex items-start justify-center gap-[105px]">
        <div className="w-[280px]">
          <img
            src={user.image}
            alt={user.fullName}
            className="w-[280px] h-[280px] object-cover rounded-full"
            width={280}
            height={280}
          />
          <h1 className="text-base font-bold leading-5 text-center mt-[50px]">
            {user.fullName}
          </h1>
          <p className="text-xs font-medium leading-3 text-center mt-2">
            {user.email}
          </p>
          <div className="flex items-center justify-center mt-10 gap-[25px]">
            <div className="flex bg-[#EFF3FA] p-[15px] rounded-lg">
              <ProfileIconFIrst />
            </div>
            <div className="flex bg-[#EFF3FA] p-[15px] rounded-lg">
              <ProfileIconSecond />
            </div>
            <div className="flex bg-[#EFF3FA] p-[15px] rounded-lg">
              <ProfileIconThird />
            </div>
          </div>
        </div>
        <div className="w-[355px]">
            <span className="font-medium">About</span>
            <p className="mt-[10px] text-[#a7a7a7] text-base font-medium leading-5 text-left">{user.about}</p>
            <div className="mt-10 flex flex-wrap gap-y-7">
                <div className="w-[50%]">
                    <span className="text-xs font-medium">Subject</span>
                    <p className="mt-[10px] text-[#a7a7a7] text-base font-medium leading-5 text-left">{user.subject}</p>
                </div>
                <div className="w-[50%]">
                    <span className="text-xs font-medium">Class</span>
                    <p className="mt-[10px] text-[#a7a7a7] text-base font-medium leading-5 text-left">{user.teacherClass}</p>
                </div>
                <div className="w-[50%]">
                    <span className="text-xs font-medium">Age</span>
                    <p className="mt-[10px] text-[#a7a7a7] text-base font-medium leading-5 text-left">{user.age}</p>
                </div>
                <div className="w-[50%]">
                    <span className="text-xs font-medium">Gender</span>
                    <p className="mt-[10px] text-[#a7a7a7] text-base font-medium leading-5 text-left">{user.gender}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSinglePage;

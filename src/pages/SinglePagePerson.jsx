import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ProfileIconFIrst,
  ProfileIconSecond,
  ProfileIconThird,
} from "../assets/icons";
import { useEntity } from "../hooks/useEntity";
import teacherService from "../services/TeacherService";
import studentService from "../services/StudentService";
import EntityDetail from "../components/EntityDetail/EntityDetail";

const SinglePagePerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Determine Context
  const entityName = state?.entityName || "Teacher";
  const isStudent = entityName === "Student";

  // --- Configuration ---

  const { getItemById } = useEntity(
    isStudent ? studentService : teacherService,
    entityName
  );
  const user = getItemById(id);

  if (!user) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        {entityName} not found
      </div>
    );
  }

  return (
    <EntityDetail
      title={user?.firstName + " " + user?.lastName}
      onBack={() => navigate(-1)}
      onEdit={() =>
        navigate(`/${isStudent ? `students` : `teachers`}/${user.id}/update`, {
          state: {
            from: `/${isStudent ? `students` : `teachers`}/${user.id}`,
            entityName: entityName,
            action: "Update",
            entityType: isStudent ? studentService : teacherService,
          },
        })
      }
      editLabel={`Update ${entityName} info`}
    >
      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 w-full h-full">
        <div className="w-full max-w-xs mx-auto text-center">
          <img
            src={user.image}
            alt={user.fullName}
            className="w-[280px] h-[280px] object-cover rounded-full mx-auto"
            width={280}
            height={280}
          />
          <h1 className="text-base font-bold leading-5 mt-6">
            {user.fullName}
          </h1>
          <p className="text-xs font-medium leading-3 mt-2 text-gray-500">
            {user.email}
          </p>
          <div className="flex items-center justify-center mt-10 gap-6">
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
        <div className="w-full lg:w-[355px]">
          <span className="font-medium">About</span>
          <p className="mt-3 text-[#a7a7a7] text-base font-medium leading-5">
            {user.about}
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DetailField label="Subject" value={user.subject} />
            <DetailField label="Class" value={user.teacherClass} />
            <DetailField label="Age" value={user.age} />
            <DetailField label="Gender" value={user.gender} />
          </div>
        </div>
      </div>
    </EntityDetail>
  );
};

const DetailField = ({ label, value }) => (
  <div>
    <span className="text-xs font-medium">{label}</span>
    <p className="mt-2 text-[#a7a7a7] text-base font-medium leading-5">
      {value}
    </p>
  </div>
);

export default SinglePagePerson;

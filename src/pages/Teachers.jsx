import React, { useContext, useState } from "react";
import NoInfo from "../assets/no-info.png";

import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import Button from "../components/Button";
import { SearchIcon } from "../assets/icons";
import TeacherCard from "../components/TeacherCard";

const Teachers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { teachers } = useContext(Context);

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
        <Button
          onClick={() => {
            navigate("add");
          }}
          title={"Add Teacher"}
        />
      </div>

      <form className="w-full mb-6">
        <div className="relative">
          <span className="absolute top-0 left-4 bottom-0 my-auto flex items-center">
            <SearchIcon className="text-gray-400" />
          </span>
          <input
            className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
            type="text"
            placeholder="Search for a teacher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {filteredTeachers.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                N
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Subject
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Class
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Email address
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Gender
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <TeacherCard teacher={teacher} index={index} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 py-12 bg-white rounded-lg shadow-sm">
          <img src={NoInfo} alt="No Info" className="w-40 h-30" />
          <div className="text-center mt-6">
            <p className="text-gray-700 text-2xl font-semibold">
              No students at this time
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;

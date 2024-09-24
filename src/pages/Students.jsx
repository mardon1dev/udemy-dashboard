import React, { useContext, useState } from "react";
import NoInfo from "../assets/no-info.png";
import { SearchIcon } from "../assets/icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import StudentCard from "../components/StudentCard";

const Students = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { students } = useContext(Context);

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>
        <Button
          onClick={() => {
            navigate("add");
          }}
          title={"Add Student"}
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
            placeholder="Search for a student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {filteredStudents.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">N</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">First Name</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Last Name</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">Student ID</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <StudentCard student={student} index={index} key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        // No Students Info
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

export default Students;

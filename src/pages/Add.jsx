import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { students, setStudents } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const newStudent = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      firstName,
      lastName,
      email,
      phone,
      studentId,
    };
    setStudents([...students, newStudent]);
    setTimeout(() => {
      navigate("/students");
    }, 500);
  }
  return (
    <div className="w-full">
      <div className="mx-auto pt-6 w-[90%] bg-white">
        <div className="flex items-center justify-between mb-[20px]">
          <Button onClick={() => navigate(-1)} title={"Back"} />
          <h3 className="text-2xl font-bold">Add Student</h3>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="fname"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              First Name
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#509CDB] focus:shadow-md"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="lname"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#509CDB] focus:shadow-md"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#509CDB] focus:shadow-md"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#509CDB] focus:shadow-md"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="studentId"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Student ID
            </label>
            <input
              type="number"
              name="studentId"
              id="studentId"
              placeholder="Enter your Student ID number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#509CDB] focus:shadow-md"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div>
            <Button type={"submit"} title={"Add Student"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

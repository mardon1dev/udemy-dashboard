import React, { useContext, useState } from 'react'
import Button from '../components/Button';
import { Context } from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { students, setStudents } = useContext(Context);
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    const student = students.find((student) => student.id == id);
    const [updateStudentFirstName, setUpdateStudentFirstName] = useState(student.firstName);
    const [updateStudentLastName, setUpdateStudentLastName] = useState(student.lastName);
    const [updateStudentEmail, setUpdateStudentEmail] = useState(student.email);
    const [updateStudentPhone, setUpdateStudentPhone] = useState(student.phone);
    const [updateStudentId, setUpdateStudentId] = useState(student.studentId);
    
    

    function handleUpdate(e) {
      e.preventDefault();
      const updatedStudent = {
        id: Number(id),
        firstName: updateStudentFirstName,
        lastName: updateStudentLastName,
        email: updateStudentEmail,
        phone: updateStudentPhone,
        studentId: updateStudentId
      }
      setStudents(students.map((student) => student.id == id ? updatedStudent : student));
      setTimeout(()=>{
        navigate(-1);
      }, 500)
    }
    return (
        <div className="w-full">
          <div className="mx-auto pt-6 w-[90%] bg-white">
            <div className="flex items-center justify-between mb-[20px]">
              <Button onClick={() => navigate(-1)} title={"Back"} />
              <h3 className="text-xl font-bold">Update Student</h3>
            </div>
            <form autoComplete="off" onSubmit={handleUpdate}>
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
                  value={updateStudentFirstName}
                  onChange={(e) => setUpdateStudentFirstName(e.target.value)}
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
                  value={updateStudentLastName}
                  onChange={(e)=> setUpdateStudentLastName(e.target.value)}
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
                  value={updateStudentPhone}
                  onChange={(e) => setUpdateStudentPhone(e.target.value)}
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
                  value={updateStudentEmail}
                  onChange={(e) => setUpdateStudentEmail(e.target.value)}
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
                  value={updateStudentId}
                  onChange={(e) => setUpdateStudentId(e.target.value)}
                />
              </div>
    
              <div>
                <Button type={"submit"} title={"Update Student"} />
              </div>
            </form>
          </div>
        </div>
      );
}

export default Update
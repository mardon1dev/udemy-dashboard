import React, { useContext, useState } from "react";
import { DeleteIcon, UpdateIcon } from "../assets/icons";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const StudentCard = ({ student, index }) => {
  const {students, setStudents} = useContext(Context);
  const [openDelete, setOpenDelete] = useState(false)
  const navigate = useNavigate();
  const handleShowDelete = () => {
    setOpenDelete(true)
  }
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id))
    setOpenDelete(false)
  }
  const handleUpdate = () => {
    navigate(`/students/${student.id}`)
  }
   return (
    <tr className="bg-[#ffffff]">
      <td className="py-4 px-3">{index + 1}</td>
      <td className="py-4 px-3 text-md font-normal leading-4 text-left">
        {student.firstName}
      </td>
      <td className="py-4 px-3 text-md font-normal leading-4 text-left">
        {student.lastName}
      </td>
      <td className="py-4 px-3 text-md font-normal leading-4 text-left">
        {student.email}
      </td>
      <td className="py-4 px-3 text-md font-normal leading-4 text-left">
        {student.phone}
      </td>
      <td className="py-4 px-3 text-md font-normal leading-4 text-left">
        {student.studentId}
      </td>
      <td className={`${!openDelete ? "py-4 px-3" : ""} relative overflow-hidden`}>
        <div className={`${!openDelete ? "flex" : "hidden"} items-center justify-center gap-3 h-full`}>
          <button onClick={handleUpdate}>
            <UpdateIcon />
          </button>
          <button onClick={handleShowDelete}>
            <DeleteIcon />
          </button>
        </div>
        <div className={`${openDelete ? "left-0" : "left-[100%]"} flex w-full items-center justify-center absolute top-0 bottom-0 duration-300 px-1 bg-[#509CDB]/30 gap-3 h-full`}>
          <button className="px-2 bg-[#509CDB] text-white rounded" onClick={()=> handleDelete(student.id)} >Yes</button>
          <button className="px-2 bg-[#509CDB] text-white rounded" onClick={()=> setOpenDelete(false)}>No</button>
        </div>
      </td>
    </tr>
  );
};

export default StudentCard;

import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { Context } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";

const TeacherAdd = () => {
  const { id } = useParams();
  const { teachers, setTeachers } = useContext(Context);
  const updatedTeacher = teachers.find((teacher) => teacher.id == id);
  const [fullName, setFullName] = useState(updatedTeacher?.fullName || "");
  const [email, setEmail] = useState(updatedTeacher?.email || "");
  const [subject, setSubject] = useState(updatedTeacher?.subject || "");
  const [teacherClass, setTeacherClass] = useState(
    updatedTeacher?.teacherClass || ""
  );
  const [gender, setGender] = useState(updatedTeacher?.gender || "");
  const [age, setAge] = useState(updatedTeacher?.age || "");
  const [about, setAbout] = useState(updatedTeacher?.about || "");
  const [image, setImage] = useState(updatedTeacher?.image || null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length ? teachers[teachers.length - 1].id + 1 : 1,
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      subject,
      teacherClass,
      gender,
      age: e.target.age.value,
      about,
      image,
    };

    if (id) {
      setTeachers(
        teachers.map((teacher) =>
          teacher.id == id
            ? {
                ...teacher,
                fullName,
                email,
                subject,
                teacherClass,
                gender,
                age,
                about,
                image,
              }
            : teacher
        )
      );
    } else {
      setTeachers([...teachers, newTeacher]);
    }
    setTimeout(() => {
      navigate("/teachers");
    }, 500);
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto pt-6 w-[90%] bg-white">
        <div className="flex items-center justify-between mb-[20px]">
          <Button onClick={() => navigate(-1)} title={"Back"} />
          <h3 className="text-2xl font-bold">Add Teacher</h3>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between"
        >
          <div className="mb-5 w-[407px]">
            <label htmlFor="fullName">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Full Name
              </span>
              <Input
                name="fullName"
                placeholder={"Full Name"}
                type={"text"}
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-5 w-[407px]">
            <label htmlFor="class">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Class
              </span>
              <select
                className="w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none"
                value={teacherClass}
                onChange={(e) => setTeacherClass(e.target.value)}
                required
              >
                <option value="">Select Class</option>
                <option value="NT-90">NT-90</option>
                <option value="NT-50">NT-50</option>
                <option value="NT-69">NT-69</option>
                <option value="Nt-50">Nt-50</option>
              </select>
            </label>
          </div>
          <div className="mb-5 w-[407px]">
            <label htmlFor="email">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Email address
              </span>
              <Input
                name="email"
                placeholder={"Email"}
                type={"email"}
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-5 w-[407px]">
            <label htmlFor="gender">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Gender
              </span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
          <div className="mb-5 w-[407px]">
            <label htmlFor="subject">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Subject
              </span>
              <select
                className="w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Tourism">Tourism</option>
                <option value="History">History</option>
              </select>
            </label>
          </div>
          <div className="mb-5 w-[407px]">
            <label htmlFor="age">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                Age
              </span>
              <Input
                name="age"
                placeholder={"Age"}
                type={"number"}
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none"
              />
            </label>
          </div>
          <div className="w-[407px] mb-5">
            <label htmlFor="about">
              <span className="mb-3 block text-base font-medium text-[#07074D]">
                About
              </span>
              <textarea
                name="about"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-[172px] border-[0.5px] border-[#A7A7A7] text-[#8A8A8A] text-sm font-medium leading-4 p-[13px] rounded outline-none"
              ></textarea>
            </label>
          </div>
          <div className="w-[407px] mb-5">
            <label htmlFor="file">
              <span className="mb-3 block text-base font-medium text-[#07074D] cursor-pointer">
                Import Image
              </span>
              <input
                type="file"
                className="hidden cursor-pointer"
                onChange={handleImageChange}
                name="file"
                id="file"
              />
              <img
                className="h-[172px] w-full object-cover"
                src={image ? image : "https://placehold.co/600x400"}
                alt="Placeholder"
                height={172}
                width={"100%"}
              />
            </label>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type={"submit"}
              title={updatedTeacher ? "Update Teacher" : "Add Teacher"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAdd;

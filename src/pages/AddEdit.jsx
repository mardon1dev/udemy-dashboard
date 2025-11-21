import React, { useEffect, useMemo } from "react";
import Button from "../components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useEntity } from "../hooks/useEntity";
import teacherService from "../services/TeacherService";
import studentService from "../services/StudentService";
import FormField from "../components/forms/FormField";
import { Toaster } from "react-hot-toast";

const AddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Determine Context
  const entityName = state?.entityName || "Teacher"; // Default to Teacher if missing
  const isStudent = entityName === "Student";

  // --- Configuration ---

  // Dropdown Options
  const classOptions = [
    { value: "", label: "Select Class" },
    { value: "ATT-50", label: "ATT-50" },
    { value: "ATT-60", label: "ATT-60" },
    { value: "ATT-70", label: "ATT-70" },
  ];

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const subjectOptions = [
    { value: "", label: "Select Subject" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "Tourism", label: "Tourism" },
    { value: "History", label: "History" },
  ];

  // Field Definitions
  // We use useMemo so these don't recreate on every render
  const formConfig = useMemo(() => {
    if (isStudent) {
      return [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "First Name",
          required: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Last Name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          required: true,
        },
        {
          name: "phone",
          label: "Phone",
          type: "tel",
          placeholder: "Enter phone",
          required: true,
        },
        {
          name: "studentId",
          label: "Student ID",
          type: "text",
          placeholder: "ID Number",
          required: true,
        },
        {
          name: "studentClass",
          label: "Class",
          type: "select",
          options: classOptions,
          required: true,
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: genderOptions,
          required: true,
        },
        { name: "age", label: "Age", type: "number", placeholder: "Age" },
        {
          name: "about",
          label: "About",
          type: "textarea",
          placeholder: "About the student",
        },
      ];
    } else {
      // Teacher Config
      return [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "First Name",
          required: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Last Name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          required: true,
        },
        {
          name: "subject",
          label: "Subject",
          type: "select",
          options: subjectOptions,
          required: true,
        },
        {
          name: "teacherClass",
          label: "Class",
          type: "select",
          options: classOptions,
          required: true,
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: genderOptions,
          required: true,
        },
        { name: "age", label: "Age", type: "number", placeholder: "Age" },
        {
          name: "about",
          label: "About",
          type: "textarea",
          placeholder: "About the teacher",
        },
      ];
    }
  }, [isStudent]);

  // --- Logic ---

  // Service Selection
  const { getItemById, createItem, updateItem, loading } = useEntity(
    isStudent ? studentService : teacherService,
    entityName
  );

  // Get existing data
  const updatedPerson = id ? getItemById(id) : null;

  // Generate Initial State dynamically based on the Config
  const getInitialValues = () => {
    const initial = {};

    // 1. Set defaults (empty strings) for all fields in config
    formConfig.forEach((field) => {
      initial[field.name] = "";
    });
    initial["image"] = null; // Image is always separate

    // 2. If editing, override with fetched data
    if (updatedPerson) {
      Object.keys(updatedPerson).forEach((key) => {
        // Only copy if not undefined
        if (updatedPerson[key] !== undefined) {
          initial[key] = updatedPerson[key];
        }
      });
    }
    return initial;
  };

  const { values, setValue, handleChange, handleSubmit, isSubmitting, errors } =
    useForm(
      getInitialValues(), // Call the helper
      async (formValues) => {
        if (id) {
          await updateItem(id, formValues);
        } else {
          await createItem(formValues);
        }
        setTimeout(() => {
          // Dynamic Redirect
          navigate(isStudent ? "/students" : "/teachers");
        }, 500);
      }
    );

  // Effect: Update form if `updatedPerson` arrives late (async fetch)
  useEffect(() => {
    if (updatedPerson) {
      Object.keys(updatedPerson).forEach((key) => {
        if (updatedPerson[key] !== undefined) setValue(key, updatedPerson[key]);
      });
    }
  }, [updatedPerson, id]); // Changed dependency to updatedPerson

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto pt-6 w-[90%] bg-white">
        <div className="flex items-center justify-between mb-[20px]">
          <Button onClick={() => navigate(-1)} title={"Back"} />
          <h3 className="text-2xl font-bold">
            {id ? "Update" : "Add"} {entityName}
          </h3>
        </div>

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between"
        >
          {/* Dynamic Field Rendering */}
          {formConfig.map((field) => (
            <div key={field.name} className="mb-5 w-[407px]">
              <FormField
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name] || ""} // Fallback to empty string to avoid uncontrolled input warning
                onChange={handleChange}
                error={errors[field.name]}
                required={field.required}
                options={field.options} // Only used if type is 'select'
              />
            </div>
          ))}

          {/* Image Upload Field (Static, as it applies to both) */}
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
                accept="image/*"
              />
              <img
                className="h-[172px] w-full object-contain focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 rounded cursor-pointer bg-gray-100"
                src={
                  values.image ||
                  "https://placehold.co/600x400?text=Upload+Image"
                }
                alt={`${entityName} Preview`}
                height={172}
                width={"100%"}
                tabIndex={0}
                onClick={() => document.getElementById("file").click()}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end mt-4">
            <Button
              type={"submit"}
              title={
                isSubmitting || loading
                  ? "Processing..."
                  : id
                  ? `Update ${entityName}`
                  : `Add ${entityName}`
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;

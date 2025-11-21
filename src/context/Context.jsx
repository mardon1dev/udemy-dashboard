import { createContext, useState, useEffect } from "react";
import studentService from "../services/StudentService";
import teacherService from "../services/TeacherService";

export const Context = createContext();

/**
 * Updated Context using Service Layer Pattern
 * Maintains backward compatibility while using services
 * Syncs with repositories automatically
 */
export const DashboardContext = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Load data from services on mount and when localStorage changes
  const loadStudents = () => {
    setStudents(studentService.getAllStudents());
  };

  const loadTeachers = () => {
    setTeachers(teacherService.getAllTeachers());
  };

  useEffect(() => {
    loadStudents();
    loadTeachers();
  }, []);

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "students") {
        loadStudents();
      } else if (e.key === "teachers") {
        loadTeachers();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Context.Provider value={{ 
      students, 
      setStudents: (newStudents) => {
        setStudents(newStudents);
        // Sync to localStorage via repository
        localStorage.setItem("students", JSON.stringify(newStudents));
      }, 
      teachers, 
      setTeachers: (newTeachers) => {
        setTeachers(newTeachers);
        // Sync to localStorage via repository
        localStorage.setItem("teachers", JSON.stringify(newTeachers));
      },
      loadStudents,
      loadTeachers
    }}>
      {children}
    </Context.Provider>
  );
};

import { createContext, useState } from "react";

export const Context = createContext();

export const DashboardContext = ({children}) => {
    const [students, setStudents] = useState(JSON.parse(localStorage.getItem("students")) || []);
    localStorage.setItem("students", JSON.stringify(students));

    const [teachers, setTeachers] = useState(JSON.parse(localStorage.getItem("teachers")) || []);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    
    return (
        <Context.Provider value={{students, setStudents, teachers, setTeachers}}>
            {children}
        </Context.Provider>
    )
}

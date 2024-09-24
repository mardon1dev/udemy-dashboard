import { createContext, useState } from "react";

export const Context = createContext();

export const DashboardContext = ({children}) => {
    const [students, setStudents] = useState(JSON.parse(localStorage.getItem("students")) || []);
    localStorage.setItem("students", JSON.stringify(students));
    
    return (
        <Context.Provider value={{students, setStudents}}>
            {children}
        </Context.Provider>
    )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Add, Billing, Dashboard, NotFound, Setting, SingleUser, Students, Update } from '../pages'

const Routeres = () => {
  return (
    <div className='w-[100%] min-h-screen p-[30px] bg-[#ffffff]'>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<Add />} />
            <Route path="/students/:id" element={<SingleUser />} />
            <Route path="/students/:id/update" element={<Update />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/setting" element={<Setting />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Routeres
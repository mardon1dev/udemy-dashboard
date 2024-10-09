import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Add, Billing, Dashboard, Exams, NotFound, Setting, SingleUser, Students, TeacherAdd, TeacherSinglePage, Teachers, Update } from '../pages'
import PageHeader from '../components/PageHeader/PageHeader'

const Routeres = () => {
  return (
    <div className='w-[100%] p-[30px] bg-[#ffffff]'>
      <PageHeader />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<Add />} />
            <Route path="/students/:id" element={<SingleUser />} />
            <Route path="/students/:id/update" element={<Update />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/add" element={<TeacherAdd />} />
            <Route path="/teachers/:id" element={<TeacherSinglePage />} />
            <Route path="/teachers/:id/update" element={<TeacherAdd />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/exams" element={<Exams />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Routeres
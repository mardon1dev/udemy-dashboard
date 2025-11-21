import studentService from '../services/StudentService'
import teacherService from '../services/TeacherService'
import entityFactory from '../factories/EntityFactory'
import { DashbpardIcon, StudentIcon } from '../assets/icons'

export const entityConfigs = {
  students: {
    id: 'students',
    name: 'Student',
    pluralName: 'Students',
    service: studentService,
    basePath: '/students',
    icon: StudentIcon,
    avatarPlaceholder: (entity) => entity?.firstName?.[0] ?? 'S',
    formFields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
      },
      {
        name: 'email',
        label: 'Email address',
        type: 'email',
        required: true,
      },
      {
        name: 'studentId',
        label: 'Student ID',
        type: 'number',
        required: true,
      },
    ],
    tableColumns: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'studentId', label: 'Student ID' },
    ],
    detailSections: [
      {
        title: 'Contact',
        fields: [
          { label: 'Phone', key: 'phone' },
          { label: 'Email', key: 'email' },
          { label: 'Student ID', key: 'studentId' },
        ],
      },
    ],
    factory: (data) => entityFactory.createStudent(data),
  },
  teachers: {
    id: 'teachers',
    name: 'Teacher',
    pluralName: 'Teachers',
    service: teacherService,
    basePath: '/teachers',
    icon: DashbpardIcon,
    avatarPlaceholder: (entity) => entity?.fullName?.[0] ?? 'T',
    formFields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
      },
      {
        name: 'teacherClass',
        label: 'Class',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select Class' },
          { value: 'ATT-50', label: 'ATT-50' },
          { value: 'ATT-60', label: 'ATT-60' },
          { value: 'ATT-70', label: 'ATT-70' },
        ],
      },
      {
        name: 'email',
        label: 'Email address',
        type: 'email',
        required: true,
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select Gender' },
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
        ],
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select Subject' },
          { value: 'Math', label: 'Math' },
          { value: 'Science', label: 'Science' },
          { value: 'Tourism', label: 'Tourism' },
          { value: 'History', label: 'History' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
      },
      {
        name: 'about',
        label: 'About',
        type: 'textarea',
      },
      {
        name: 'image',
        label: 'Picture',
        type: 'image',
      },
    ],
    tableColumns: [
      { key: 'fullName', label: 'Name' },
      { key: 'subject', label: 'Subject' },
      { key: 'teacherClass', label: 'Class' },
      { key: 'email', label: 'Email address' },
      { key: 'gender', label: 'Gender' },
    ],
    detailSections: [
      {
        title: 'Profile',
        fields: [
          { label: 'Subject', key: 'subject' },
          { label: 'Class', key: 'teacherClass' },
          { label: 'Age', key: 'age' },
          { label: 'Gender', key: 'gender' },
        ],
      },
      {
        title: 'About',
        fields: [{ label: 'Biography', key: 'about' }],
      },
    ],
    factory: (data) => entityFactory.createTeacher(data),
  },
}

export const getEntityConfig = (entityId) => entityConfigs[entityId]



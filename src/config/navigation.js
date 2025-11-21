import {
  BillingIcon,
  DashbpardIcon,
  ExamsIcon,
  SettingIcon,
  StudentIcon,
} from '../assets/icons'

/**
 * Navigation configuration
 * Allows future role-based filtering and dynamic rendering
 */
export const NAV_LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: DashbpardIcon,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'teachers',
    label: 'Teachers',
    path: '/teachers',
    icon: DashbpardIcon,
    roles: ['admin'],
  },
  {
    id: 'students',
    label: 'Students',
    path: '/students',
    icon: StudentIcon,
    roles: ['admin'],
  },
  {
    id: 'billing',
    label: 'Billing',
    path: '/billing',
    icon: BillingIcon,
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings and profile',
    path: '/setting',
    icon: SettingIcon,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'exams',
    label: 'Exams',
    path: '/exams',
    icon: ExamsIcon,
    roles: ['admin', 'teacher'],
  },
]

export const getNavLinksForRole = (role = 'admin') =>
  NAV_LINKS.filter((link) => link.roles.includes(role))



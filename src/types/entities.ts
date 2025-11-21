export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  studentClass?: string;
  gender?: string;
  age?: number;
  about?: string;
  image?: string | null;
}

export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  teacherClass: string;
  gender: string;
  age?: string;
  about?: string;
  image?: string | null;
}

export interface UserCredentials {
  id?: number;
  login: string;
  password: string;
}

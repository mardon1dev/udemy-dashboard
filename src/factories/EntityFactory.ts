import { Student, Teacher, UserCredentials } from "../types/entities";

class EntityFactory {
  createStudent(data: Partial<Student>): Student {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      studentId: data.studentId,
      about: data.about,
      age: data.age,
      gender: data?.gender,
      studentClass: data?.studentClass,
      image: data.image ?? null,
    };
  }

  createTeacher(data: Partial<Teacher>): Teacher {
    return {
      id: data.id,
      fullName: data.fullName,
      lastName: data.lastName,
      email: data.email,
      subject: data.subject,
      teacherClass: data.teacherClass,
      gender: data.gender,
      age: data.age,
      about: data.about,
      image: data.image ?? null,
    };
  }

  createUser(data: Partial<UserCredentials>): UserCredentials {
    return {
      id: data.id,
      login: data.login,
      password: data.password,
    };
  }

  create(type: "student" | "teacher" | "user", data: any) {
    switch (type) {
      case "student":
        return this.createStudent(data);
      case "teacher":
        return this.createTeacher(data);
      case "user":
        return this.createUser(data);
      default:
        throw new Error(`Unknown entity type: ${type}`);
    }
  }
}

export default new EntityFactory();

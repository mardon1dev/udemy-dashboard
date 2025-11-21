import BaseRepository from "./BaseRepository";
import { Teacher } from "../types/entities";
import { getProvider } from "./providerRegistry";

class TeacherRepository extends BaseRepository<Teacher> {
  constructor() {
    super(getProvider("teachers"));
  }

  searchByName(searchTerm: string): Teacher[] {
    return this.search(
      (teacher) =>
        teacher.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        teacher.lastName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        teacher.subject?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        teacher.teacherClass
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase()) ||
        (teacher.about &&
          teacher.about?.toLowerCase().includes(searchTerm?.toLowerCase())) ||
        teacher.age?.toString().includes(searchTerm)
    );
  }

  findByEmail(email: string): Teacher | null {
    return this.search((teacher) => teacher.email === email)[0] ?? null;
  }

  findBySubject(subject: string): Teacher[] {
    return this.search((teacher) => teacher.subject === subject);
  }

  findByClass(teacherClass: string): Teacher[] {
    return this.search((teacher) => teacher.teacherClass === teacherClass);
  }
}

export default new TeacherRepository();

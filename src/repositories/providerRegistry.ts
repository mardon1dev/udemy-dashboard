import { DataProvider, LocalStorageProvider } from '../data/providers/DataProvider'
import { Student, Teacher, UserCredentials } from '../types/entities'

type ProviderMap = {
  students: DataProvider<Student>
  teachers: DataProvider<Teacher>
  user: DataProvider<UserCredentials>
}

const providers: ProviderMap = {
  students: new LocalStorageProvider<Student>('students'),
  teachers: new LocalStorageProvider<Teacher>('teachers'),
  user: new LocalStorageProvider<UserCredentials>('user'),
}

export const getProvider = <K extends keyof ProviderMap>(key: K): ProviderMap[K] => providers[key]

export const registerProvider = <K extends keyof ProviderMap>(
  key: K,
  provider: ProviderMap[K],
) => {
  providers[key] = provider
}



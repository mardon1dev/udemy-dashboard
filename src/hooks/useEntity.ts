import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type EntityService<T> = Partial<{
  getAll(): T[];
  getAllStudents(): T[];
  getAllTeachers(): T[];
  getById(id: number | string): T | undefined;
  getStudentById(id: number | string): T | undefined;
  getTeacherById(id: number | string): T | undefined;
  create(item: T): T;
  createStudent(item: T): T;
  createTeacher(item: T): T;
  update(id: number | string, item: T): T;
  updateStudent(id: number | string, item: T): T;
  updateTeacher(id: number | string, item: T): T;
  delete(id: number | string): void;
  deleteStudent(id: number | string): void;
  deleteTeacher(id: number | string): void;
}>;

export const useEntity = <T extends { id?: number }>(
  service: EntityService<T>,
  entityName: string
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveGetter = () => {
    if (service.getAllStudents) return service.getAllStudents();
    if (service.getAllTeachers) return service.getAllTeachers();
    if (service.getAll) return service.getAll();
    return [];
  };

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = resolveGetter();
      setItems(data ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      toast.error(`Failed to load ${entityName}: ${message}`);
    } finally {
      setLoading(false);
    }
  }, [service, entityName]);

  const resolveCreate = (itemData: T) => {
    if (service.createStudent) return service.createStudent(itemData);
    if (service.createTeacher) return service.createTeacher(itemData);
    if (service.create) return service.create(itemData);
    throw new Error("Service does not have a create method");
  };

  const createItem = useCallback(
    async (itemData: T) => {
      setLoading(true);
      setError(null);
      try {
        const newItem = resolveCreate(itemData);
        setItems((prev) => [...prev, newItem]);
        toast.success(`${entityName} created successfully`);
        return newItem;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [service, entityName]
  );

  const resolveUpdate = (id: number | string, data: T) => {
    if (service.updateStudent) return service.updateStudent(id, data);
    if (service.updateTeacher) return service.updateTeacher(id, data);
    if (service.update) return service.update(id, data);
    throw new Error("Service does not have an update method");
  };

  const updateItem = useCallback(
    async (id: number | string, itemData: T) => {
      setLoading(true);
      setError(null);
      try {
        const updatedItem = resolveUpdate(id, itemData);
        setItems((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        toast.success(`${entityName} updated successfully`);
        return updatedItem;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [service, entityName]
  );

  const resolveDelete = (id: number | string) => {
    if (service.deleteStudent) return service.deleteStudent(id);
    if (service.deleteTeacher) return service.deleteTeacher(id);
    if (service.delete) return service.delete(id);
    throw new Error("Service does not have a delete method");
  };

  const deleteItem = useCallback(
    async (id: number | string) => {
      setLoading(true);
      setError(null);
      try {
        resolveDelete(id);
        setItems((prev) => prev.filter((item) => item.id !== Number(id)));
        toast.success(`${entityName} deleted successfully`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error(`Failed to delete ${entityName}: ${message}`);
      } finally {
        setLoading(false);
      }
    },
    [service, entityName]
  );

  const getItemById = useCallback(
    (id: number | string) => {
      if (service.getStudentById) return service.getStudentById(id);
      if (service.getTeacherById) return service.getTeacherById(id);
      if (service.getById) return service.getById(id);
      return undefined;
    },
    [service]
  );

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    loadItems,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
  };
};

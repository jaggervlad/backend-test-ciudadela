export interface BaseRepository<T> {
  getAll: (filters?: Record<string, string>) => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (payload: Partial<T>) => Promise<void>;
  updateById: (id: string, payload: Partial<T>) => Promise<void>;
  deleteById: (id: string) => Promise<void>;
}

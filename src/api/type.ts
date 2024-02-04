export interface Entry {
  id: string;
  value: string;
}

export interface TextEntry extends Entry {
  category: string;
}

export interface Api<T extends Entry = Entry> {
  getAll(): T[] | Promise<T[]>;
  addNewItem(): void | Promise<void>;
  getItem(id: string): T | Promise<T>;
  setItem(id: string, data: Omit<T, "id">): void | Promise<void>;
  deleteItem(id: string): void | Promise<void>;
}

export interface Entry {
  id: string;
  value: string;
}

export interface Api {
  getAll(): Entry[] | Promise<Entry[]>;
  addNewItem(): void | Promise<void>;
  getItem(id: string): Entry | Promise<Entry>;
  setItem(id: string, value: string): void | Promise<void>;
  deleteItem(id: string): void | Promise<void>;
}

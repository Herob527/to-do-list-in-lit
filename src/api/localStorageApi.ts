import { LOCAL_STORAGE_KEY } from "src/constants";
import type { Api, Entry } from "./type";
import { v4 } from "uuid";

const localStorageApi = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, "[]");
  }
  return {
    getAll: () =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as Entry[],

    addNewItem: () => {
      const dataItem = { id: v4(), value: "" } satisfies Entry;

      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      ) as Entry[];

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([...currentData, dataItem]),
      );

      dispatchEvent(new Event("storage"));
    },
    getItem: (id: string) =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]").find(
        (e: Entry) => e.id === id,
      ) as Entry,
    setItem: (id: string, value: string) => {
      const entries: Entry[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      );
      const newEntry = { id, value };
      const entryIndex = entries.findIndex((entry) => entry.id === id);
      entries[entryIndex] = newEntry;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...entries]));

      dispatchEvent(new Event("storage"));
    },
    deleteItem: (id: string) => {
      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      ) as Entry[];

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(currentData.filter((entry) => entry.id !== id)),
      );

      dispatchEvent(new Event("storage"));
    },
  } satisfies Api;
};

export const api = localStorageApi();

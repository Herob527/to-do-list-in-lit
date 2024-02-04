import { LOCAL_TEXT_STORAGE_KEY } from "src/constants";
import type { Api, Entry } from "./type";
import { v4 } from "uuid";

export interface TextEntry extends Entry {
  category: string;
}
const localTextsApi = () => {
  if (!localStorage.getItem(LOCAL_TEXT_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_TEXT_STORAGE_KEY, "[]");
  }
  return {
    getAll: () =>
      JSON.parse(
        localStorage.getItem(LOCAL_TEXT_STORAGE_KEY) || "[]",
      ) as TextEntry[],

    addNewItem: () => {
      const dataItem = {
        id: v4(),
        value: "",
        category: "None",
      } satisfies TextEntry;

      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_TEXT_STORAGE_KEY) || "[]",
      ) as TextEntry[];

      localStorage.setItem(
        LOCAL_TEXT_STORAGE_KEY,
        JSON.stringify([...currentData, dataItem]),
      );

      dispatchEvent(new Event("storage"));
    },
    getItem: (id) =>
      JSON.parse(localStorage.getItem(LOCAL_TEXT_STORAGE_KEY) || "[]").find(
        (e: TextEntry) => e.id === id,
      ) as TextEntry,

    patchItem: (id, { value, category }) => {
      const entries: TextEntry[] = JSON.parse(
        localStorage.getItem(LOCAL_TEXT_STORAGE_KEY) || "[]",
      );
      const newEntry = { id, value, category };
      const entryIndex = entries.findIndex((entry) => entry.id === id);
      entries[entryIndex] = newEntry;
      localStorage.setItem(
        LOCAL_TEXT_STORAGE_KEY,
        JSON.stringify([...entries]),
      );

      dispatchEvent(new Event("storage"));
    },

    deleteItem: (id) => {
      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_TEXT_STORAGE_KEY) || "[]",
      ) as TextEntry[];

      localStorage.setItem(
        LOCAL_TEXT_STORAGE_KEY,
        JSON.stringify(currentData.filter((entry) => entry.id !== id)),
      );

      dispatchEvent(new Event("storage"));
    },
  } satisfies Api<TextEntry>;
};

export const textsApi = localTextsApi();

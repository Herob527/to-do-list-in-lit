import { LOCAL_CATEGORY_STORAGE_KEY } from "src/constants";
import type { Api, Entry } from "./type";
import { v4 } from "uuid";

interface CategoryEntry extends Entry {}

const localCategoryApi = () => {
  if (!localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_CATEGORY_STORAGE_KEY, "[]");
  }
  return {
    getAll: () =>
      JSON.parse(
        localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || "[]",
      ) as CategoryEntry[],

    addNewItem: (param) => {
      const dataItem = {
        id: v4(),
        value: param?.value ?? "",
      } satisfies CategoryEntry;

      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || "[]",
      ) as CategoryEntry[];

      localStorage.setItem(
        LOCAL_CATEGORY_STORAGE_KEY,
        JSON.stringify([...currentData, dataItem]),
      );
      dispatchEvent(new Event("storage"));
    },

    getItem: (id) =>
      JSON.parse(localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || "[]").find(
        (e: CategoryEntry) => e.id === id,
      ) as CategoryEntry,

    patchItem: (id, { value }) => {
      const entries: CategoryEntry[] = JSON.parse(
        localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || "[]",
      );
      const newEntry = { id, value };
      const entryIndex = entries.findIndex((entry) => entry.id === id);
      entries[entryIndex] = newEntry;
      localStorage.setItem(
        LOCAL_CATEGORY_STORAGE_KEY,
        JSON.stringify([...entries]),
      );

      dispatchEvent(new Event("storage"));
    },

    deleteItem: (id) => {
      const currentData = JSON.parse(
        localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || "[]",
      ) as CategoryEntry[];

      localStorage.setItem(
        LOCAL_CATEGORY_STORAGE_KEY,
        JSON.stringify(currentData.filter((entry) => entry.id !== id)),
      );

      dispatchEvent(new Event("storage"));
    },
  } satisfies Api<CategoryEntry>;
};

export const categoryApi = localCategoryApi();

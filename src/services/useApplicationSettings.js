import { localKey } from "../utils";
import { create } from "zustand";

const defaultValue = {
  expandSidebar: true,
};

const getInitialState = () => {
  if (typeof window === "undefined") return defaultValue;

  const storedData = localStorage.getItem(localKey.applicationSettings);

  if (!storedData) return defaultValue;

  const parseStoredData = JSON.parse(storedData);

  return parseStoredData;
};

const initialState = getInitialState();

export const useApplicationSettings = create()(
  (set) => ({
    value: initialState,

    toggleExpandSidebar: () =>
      set((state) => {
        const nextState = {
          ...state.value,
          expandSidebar: !state.value.expandSidebar,
        };

        localStorage.setItem(
          localKey.applicationSettings,
          JSON.stringify(nextState)
        );

        return { ...state, value: nextState };
      }),
  })
);

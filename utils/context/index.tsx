import {
  createContext,
  FC,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useFetch } from "../hooks";
import { url } from "../APIUrl";
import { IWilder } from "../../types/wilder";

export interface IApiContext {
  wilders: IWilder[];
  setWilders: Dispatch<SetStateAction<IWilder[]>>;
  // updateWilders: (wilders: IWilder[]) => void;
  addNewWilder: (wilder: IWilder) => void;
}

export const ApiContext = createContext<IApiContext>({
  wilders: [],
  setWilders: () => [],
  addNewWilder: () => {},
});

export const ApiProvider: FC = ({ children }) => {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  console.log("wilders :>> ", wilders);
  // const updateWilders = (wilders: IWilder[]) => {
  //   setWilders(wilders);
  // };
  const addNewWilder = (wilder: IWilder) => {
    setWilders((prevState) => {
      return [...prevState, wilder];
    });
  };
  return (
    <ApiContext.Provider value={{ wilders, setWilders, addNewWilder }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};

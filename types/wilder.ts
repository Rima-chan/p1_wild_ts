import { Dispatch, SetStateAction } from "react";

export interface IWilder {
  key?: string;
  _id?: string;
  name: string;
  city: string;
  skills: ISkill[];
}

export interface ISkill {
  _id?: string;
  title: string;
  votes: number;
}

export interface WilderProps {
  wilders?: IWilder[];
  setWilders: Dispatch<SetStateAction<IWilder[]>>;
}

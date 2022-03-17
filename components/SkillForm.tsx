import React, {
  useState,
  ChangeEvent,
  useEffect,
  FC,
  FormEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { Skill } from "./Skill";
import styles from "../styles/components/WilderForm.module.css";
import { IWilder, ISkill } from "../types/wilder";
import { url } from "../utils/APIUrl";
import { WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";

interface ISkillFormProps {
  skills: ISkill[];
  setSkills: Dispatch<SetStateAction<ISkill[]>>;
}

export const SkillForm: FC<ISkillFormProps> = ({ skills, setSkills }) => {
  const addSkill = () => {};
  const deleteSkill = (title: string | null, votes: number | null) => {
    if (!title || !votes) return;
    setWilder((prevState) => {
      return {
        ...prevState,
        skills: [
          ...prevState.skills.filter(
            (skill) => skill.title !== title && skill.votes !== votes
          ),
        ],
      };
    });
  };
  return (
    <>
      <label htmlFor="skill-input" className={styles.skills_label}>
        Title :
      </label>
      <input
        id="skill-input"
        type="text"
        placeholder="Type your skills"
        value={skill.title}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setSkill((prevState) => {
            return { ...prevState, title: e.target.value };
          });
        }}
      ></input>
      <label htmlFor="votes-select" className={styles.skills_label}>
        Votes :
      </label>
      <select
        name="votes"
        id="votes-select"
        className={styles.skills_select}
        value={skill.votes}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          setSkill((prevState) => {
            return { ...prevState, votes: parseInt(e.target.value, 10) };
          });
        }}
      >
        <option value="">-- Please choose an option --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button type="button" className={styles.skills_button} onClick={addSkill}>
        +
      </button>
    </>
  );
};

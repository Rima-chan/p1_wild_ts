import React, {
  useState,
  ChangeEvent,
  useEffect,
  FC,
  FormEvent,
  SetStateAction,
  Dispatch,
  useReducer,
} from "react";
import { Skill } from "./Skill";
import styles from "../styles/components/WilderForm.module.css";
import { IWilder, ISkill } from "../types/wilder";
import { url } from "../utils/APIUrl";
import { WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";
import { on } from "events";

interface ISkillFormProps {
  skills: ISkill[];
  setSkills: Dispatch<SetStateAction<ISkill[]>>;
  inEditMode: boolean;
  setInEditMode: Dispatch<SetStateAction<boolean>>;
  onCallback?: (data: ISkill[], id: string | undefined) => void;
  wilderId?: string;
}

export const SkillForm: FC<ISkillFormProps> = ({
  skills,
  setSkills,
  inEditMode,
  setInEditMode,
  onCallback,
  wilderId,
}) => {
  const [currentSkill, setCurrentSkill] = useState<ISkill>({
    title: "",
    votes: 0,
  });
  const addSkill = () => {
    if (!currentSkill.title || !currentSkill.votes) return;
    setSkills((prevState) => {
      return [...prevState, currentSkill];
    });
    setCurrentSkill({ title: "", votes: 0 });
  };
  const deleteSkill = (title: string | null, votes: number | null) => {
    if (!title || !votes) return;
    setSkills((prevState) => {
      return [
        ...prevState.filter(
          (skill) => skill.title !== title && skill.votes !== votes
        ),
      ];
    });
  };
  const updateSkills = () => {
    if (onCallback && wilderId) {
      onCallback(skills, wilderId);
      setInEditMode(false);
    }
  };
  return (
    <>
      <span className={styles.skills}>
        <label htmlFor="skill-input" className={styles.skills_label}>
          Title :
        </label>
        <input
          id="skill-input"
          type="text"
          placeholder="Type your skills"
          className={styles.skills_title}
          value={currentSkill.title}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setCurrentSkill({ ...currentSkill, title: e.target.value });
          }}
        ></input>
        <label htmlFor="votes-select" className={styles.skills_label}>
          Votes :
        </label>
        <input
          className={styles.skills_votes}
          type="number"
          min="0"
          max="20"
          name="votes"
          id="votes-select"
          value={currentSkill.votes}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setCurrentSkill({
              ...currentSkill,
              votes: parseInt(e.target.value),
            });
          }}
        ></input>
        <button
          type="button"
          className={styles.skills_button}
          onClick={addSkill}
        >
          ➕
        </button>
        {inEditMode ? (
          <button
            type="button"
            className={styles.skills_button}
            onClick={updateSkills}
          >
            ✔️
          </button>
        ) : null}
      </span>
      <ul className={styles.skills_list}>
        {skills &&
          skills.map((skill, index) => {
            return (
              <Skill
                key={`${skill.title}-${index}`}
                title={skill.title}
                votes={skill.votes}
                deleteButton={true}
                onCallback={deleteSkill}
              />
            );
          })}
      </ul>
    </>
  );
};

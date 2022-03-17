import React, {
  Dispatch,
  SetStateAction,
  MouseEvent,
  MouseEventHandler,
} from "react";
import styles from "../styles/components/Skill.module.css";
import { ISkill, IWilder } from "../types/wilder";

interface SkillProps extends ISkill {
  deleteButton: boolean;
  onCallback?: (title: string | null, votes: number | null) => void;
}

export const Skill = ({
  title,
  votes,
  deleteButton,
  onCallback,
}: SkillProps) => {
  const onDelete = (e: MouseEvent<HTMLElement>) => {
    console.log(e);
    const title = e.currentTarget.getAttribute("data-title");
    const votesInString = e.currentTarget.getAttribute("data-votes");
    const votes = Number(votesInString);
    if (onCallback) {
      onCallback(title, votes);
    }
  };
  return (
    <>
      <span className={styles.skill_wrapper}>
        <li className={styles.li}>
          {title} <span className={styles.votes}>{votes}</span>
        </li>
        {deleteButton ? (
          <button
            type="button"
            className={styles.skill_button}
            onClick={onDelete}
            data-title={title}
            data-votes={votes}
          >
            X
          </button>
        ) : null}
      </span>
    </>
  );
};

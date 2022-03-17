import React, { useState } from "react";
import Image from "next/image";
import blank_profil from "../public/blank_profil.png";
import styles from "../styles/components/WilderCard.module.css";
import { Skill } from "./Skill";
import { InlineEdit } from "./InlineEdit";
import { IWilder, WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";
import { url } from "../utils/APIUrl";

export const WilderCard = ({
  name,
  city,
  skills,
  _id,
  setWilders,
}: IWilder & WilderProps) => {
  const { response, error, fetchData } = useCreateUpdateAxios();
  const [modeEditSkills, setModeEditSkills] = useState(false);
  const onDelete = () => {
    if (
      window.confirm(`Do you want to delete ${name ? name : "this wilder"} ?`)
    ) {
      fetchData({
        url: `${url}${_id}`,
        method: "DELETE",
        handlerEnabled: true,
      });
      setWilders((prevState) => {
        return [...prevState.filter((wilder) => wilder._id !== _id)];
      });
    }
  };
  const editSkills = () => {
    setModeEditSkills(!modeEditSkills);
  };
  return (
    <>
      <article className={styles.card} id={_id}>
        <button className={styles.action_button} onClick={onDelete}>
          X
        </button>
        <Image src={blank_profil} alt="Jane Doe Profil" />
        <InlineEdit
          value={name}
          classes="editable_title"
          onCallback={(data, id) => {
            fetchData({
              url: `${url}${id}`,
              method: "PUT",
              data: { name: data },
              handlerEnabled: true,
            });
            console.log(response);
          }}
          id={_id}
        />
        <InlineEdit
          value={city}
          onCallback={(data, id) => {
            fetchData({
              url: `${url}${id}`,
              method: "PUT",
              data: { city: data },
              handlerEnabled: true,
            });
            console.log(response);
          }}
          id={_id}
          classes="yo"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <span className={styles.skills_wrapper}>
          <h4>Wild Skills</h4>
          <button className={styles.action_button} onClick={editSkills}>
            🖍
          </button>
        </span>
        <ul className={styles.skills}>
          {skills && skills.length > 0
            ? skills.map((skill) => (
                <Skill
                  key={skill._id}
                  title={skill.title}
                  votes={skill.votes}
                  deleteButton={modeEditSkills}
                />
              ))
            : null}
        </ul>
      </article>
    </>
  );
};

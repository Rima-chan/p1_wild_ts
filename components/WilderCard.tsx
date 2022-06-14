import React, { useEffect, useState } from "react";
import Image from "next/image";
import blank_profil from "../public/blank_profil.png";
import styles from "../styles/components/WilderCard.module.css";
import { Skill } from "./Skill";
import { InlineEdit } from "./InlineEdit";
import { ISkill, IWilder, WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";
import { url } from "../utils/APIUrl";
import { SkillForm } from "./SkillForm";

export const WilderCard = ({
  name,
  city,
  skills,
  _id,
  setWilders,
}: IWilder & WilderProps) => {
  const {
    response: deleteResponse,
    error: deleteError,
    fetchData: deleteData,
  } = useCreateUpdateAxios();
  const {
    response: updateResponse,
    error: updateError,
    fetchData: updateData,
  } = useCreateUpdateAxios();

  const [modeEditSkills, setModeEditSkills] = useState(false);
  const [skillsToUpdate, setSkillsToUpdate] = useState<ISkill[]>(skills);
  const onDelete = () => {
    if (
      window.confirm(`Do you want to delete ${name ? name : "this wilder"} ?`)
    ) {
      deleteData({
        url: `${url}${_id}`,
        method: "DELETE",
        handlerEnabled: true,
      });
    }
  };
  useEffect(() => {
    if (deleteResponse) {
      setWilders((prevState) => {
        return [...prevState.filter((wilder) => wilder._id !== _id)];
      });
    }
    if (updateResponse) {
      setWilders((prevState) => {
        return [
          ...prevState,
          ...prevState.map((wilder) => {
            if (wilder._id === _id) {
              return updateResponse?.data.result;
            }
          }),
        ];
      });
    }
  }, [deleteResponse, updateResponse]);
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
            updateData({
              url: `${url}${id}`,
              method: "PUT",
              data: { name: data },
              handlerEnabled: true,
            });
          }}
          id={_id}
        />
        <InlineEdit
          value={city}
          onCallback={(data, id) => {
            updateData({
              url: `${url}${id}`,
              method: "PUT",
              data: { city: data },
              handlerEnabled: true,
            });
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
        {modeEditSkills ? (
          <SkillForm
            skills={skillsToUpdate}
            setSkills={setSkillsToUpdate}
            inEditMode={modeEditSkills}
            setInEditMode={setModeEditSkills}
            wilderId={_id}
            onCallback={(data, id) => {
              updateData({
                url: `${url}${id}`,
                method: "PUT",
                data: { skills: data },
                handlerEnabled: true,
              });
            }}
          />
        ) : (
          <ul className={styles.skills}>
            {skills && skills.length > 0
              ? skills.map((skill) => (
                  <Skill
                    key={skill._id}
                    title={skill.title}
                    votes={skill.votes}
                    deleteButton={false}
                  />
                ))
              : null}
          </ul>
        )}
      </article>
    </>
  );
};

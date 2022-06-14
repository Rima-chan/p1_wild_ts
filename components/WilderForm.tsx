import React, { useState, ChangeEvent, useEffect, FC, FormEvent } from "react";
import { Skill } from "./Skill";
import styles from "../styles/components/WilderForm.module.css";
import { IWilder, ISkill } from "../types/wilder";
import { url } from "../utils/APIUrl";
import { WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";
import { SkillForm } from "./SkillForm";

export const WilderForm: FC<WilderProps> = ({ setWilders }) => {
  const [wilder, setWilder] = useState<IWilder>({
    name: "",
    city: "",
    skills: [],
  });
  const [skills, setSkills] = useState<ISkill[]>([]);
  const { response, error, loading, fetchData } = useCreateUpdateAxios();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(wilder);
    await fetchData({
      url: url,
      method: "POST",
      data: wilder,
      handlerEnabled: true,
    });
  };
  useEffect(() => {
    if (response !== null || response !== undefined) {
      const result: IWilder = response?.data?.result;
      setWilders((prevState) => {
        return [result, ...prevState];
      });
      setSkills([]);
      setWilder({ name: "", city: "", skills: [] });
    }
  }, [response]);
  useEffect(() => {
    setWilder((prevState) => {
      return { ...prevState, skills: skills };
    });
  }, [skills]);
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="name-input">Name :</label>
        <input
          id="name-input"
          type="text"
          placeholder="Type the name"
          value={wilder.name}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setWilder((prevState) => {
              return { ...prevState, name: e.target.value };
            });
          }}
          required
        ></input>
        <label htmlFor="city-input">City :</label>
        <input
          id="city-input"
          type="text"
          placeholder="Type the city"
          value={wilder.city}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setWilder((prevState) => {
              return { ...prevState, city: e.target.value };
            });
          }}
        ></input>
        <h3 className={styles.skills_h3}>Skills : </h3>
        <SkillForm skills={skills} setSkills={setSkills} inEditMode={false} />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

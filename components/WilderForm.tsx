import React, { useState, ChangeEvent, useEffect, FC, FormEvent } from "react";
import { Skill } from "./Skill";
import styles from "../styles/components/WilderForm.module.css";
import { IWilder, ISkill } from "../types/wilder";
import { url } from "../utils/APIUrl";
import { WilderProps } from "../types/wilder";
import { useCreateUpdateAxios } from "../utils/hooks";

export const WilderForm: FC<WilderProps> = ({ setWilders }) => {
  const [wilder, setWilder] = useState<IWilder>({
    name: "",
    city: "",
    skills: [],
  });
  const [skills, setSkills] = useState<ISkill[]>([
    {
      title: "",
      votes: 0,
    },
  ]);
  const { response, error, loading, fetchData } = useCreateUpdateAxios();

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
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setWilder({ name: "", city: "", skills: [] });
    }
  }, [response]);
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

        {/* <span className={styles.skills}>
          <span className={styles.skills_inputs}>
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
          </span>
          <button
            type="button"
            className={styles.skills_button}
            onClick={addSkill}
          >
            +
          </button>
        </span> */}
        <ul className={styles.skills_list}>
          {wilder.skills &&
            wilder.skills.map((skill, index) => {
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

        <button type="submit">Add</button>
      </form>
    </>
  );
};

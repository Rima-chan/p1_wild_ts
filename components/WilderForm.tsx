import React, { useState, useContext } from "react";
import { Skill } from "./Skill";
import styles from "../styles/components/WilderForm.module.css";

export const WilderForm = () => {
  const [wilder, setWilder] = useState({
    name: "",
    city: "",
    skills: [],
  });
  const [skill, setSkill] = useState({
    title: "",
    votes: "",
  });
  return (
    <>
      <form className="add_form">
        <label htmlFor="name-input">Name :</label>
        <input
          id="name-input"
          type="text"
          placeholder="Type the name"
          value={wilder.name}
          required
        ></input>
        <label htmlFor="city-input">City :</label>
        <input
          id="city-input"
          type="text"
          placeholder="Type the city"
          value={wilder.city}
        ></input>
        <span className={styles.skills}>
          <span className={styles.skills_inputs}>
            <h3 className={styles.skills_h3}>Skills : </h3>
            <label htmlFor="skill-input" className={styles.skills_label}>
              Title :
            </label>
            <input
              id="skill-input"
              type="text"
              placeholder="Type your skills"
              value={skill.title}
            ></input>
            <label htmlFor="votes-select" className={styles.skills_label}>
              Votes :
            </label>
            <select name="votes" id="votes-select" value={skill.votes || ""}>
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
          <button type="button" className={styles.skills_button}>
            +
          </button>
        </span>
        <span></span>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

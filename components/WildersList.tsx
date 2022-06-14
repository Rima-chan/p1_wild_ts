import React, { FC, useEffect, useContext } from "react";
import { WilderCard } from "./WilderCard";
import { url } from "../utils/APIUrl";
import { useApiContext } from "../utils/context";
import { ApiContext } from "../utils/context";
import { WilderProps } from "../types/wilder";
import { useReadAxios } from "../utils/hooks";
import { IWilder } from "../types/wilder";
import { IServerResponse } from "../utils/hooks";

export const WildersList: FC<WilderProps> = ({ wilders, setWilders }) => {
  const { response, loading, error } = useReadAxios({
    url: url,
    method: "GET",
    handlerEnabled: true,
  });
  useEffect(() => {
    if (response !== null) {
      setWilders(response?.data.result);
    }
  }, [response]);
  return (
    <main className="container">
      <h2>Wilders</h2>
      <section className="card-row">
        {wilders && wilders.length > 0
          ? wilders.map((wilder, index) => {
              console.log(wilder);
              return (
                <WilderCard
                  key={`${wilder.name}-${index}`}
                  name={wilder.name}
                  city={wilder.city}
                  skills={wilder.skills}
                  _id={wilder._id}
                  setWilders={setWilders}
                />
              );
            })
          : null}
      </section>
    </main>
  );
};

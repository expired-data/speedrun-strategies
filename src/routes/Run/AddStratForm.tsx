import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Strat } from "api";
import React, { FC, useState } from "react";

interface Props {
  time: number;
  addStrat: (strat: Strat) => void;
  run: string;
}

export const AddStratForm: FC<Props> = ({ time, addStrat, run }) => {
  const [stratTime, setStratTime] = useState<number | undefined>();
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const clearForm = () => {
    setStratTime(undefined);
    setName("");
    setComment("");
  };
  return (
    <div>
      <h1>Add New Strat</h1>
      <label htmlFor="timestamp">timestamp (s):</label>
      <input
        type="number"
        id="timestamp"
        name="timestamp"
        value={stratTime === undefined ? Math.round(time) : stratTime}
        onChange={(e) => {
          setStratTime(+e.target.value);
        }}
      />
      <button onClick={() => setStratTime(undefined)}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <br />
      <label htmlFor="name">name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label htmlFor="comment">comment:</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        rows={4}
        cols={50}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          addStrat({
            id: "",
            run,
            timestamp: stratTime === undefined ? Math.round(time) : stratTime,
            name,
            comment,
          });
          clearForm();
        }}
      >
        Add
      </button>
    </div>
  );
};

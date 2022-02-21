import React from "react";
import "./styles.css";

interface IButtonProps {
	text: string;
	type: "secondary" | "primary";
	style?: any;
	disabled?: boolean;
}

export default function Button(props:IButtonProps) {
  return(
    <button
      className={`btn ${props.type}`}
      style={props.style ? props.style : {}}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

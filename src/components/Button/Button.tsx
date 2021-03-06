import React from "react";
import "./styles.css";
import {Spin} from "antd";

interface IButtonProps {
	text: string;
	type: "secondary" | "primary";
	style?: any;
	disabled?: boolean;
	htmlType?: "submit";
	onClick?: () => void;
	loading?: boolean;
}

export default function Button(props:IButtonProps) {
  return(
    <button
      className={`btn ${props.type}`}
      style={props.style ? props.style : {}}
      disabled={props.disabled}
	  type={props.htmlType}
	  onClick={() => props.onClick ? props.onClick() : null}
    >
      {props.loading
        ? <Spin />
        : props.text
      }
    </button>
  );
}

import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
import "./Inputs.css";

interface CustomInputProps {
	htmlFor: string
	name: string
	placeholder?: string
	value: string
	disabled: boolean
	handleChange: any
	onBlur?: any
	label: string
	style?: any;
	type?: "textField" | "number";
	rows?: number;
	error?: string | undefined;
}

export default function FormikInput(props:CustomInputProps) {

  return (
    <div
      style={props.style}
      className="formik_input">
      <label
        className="formik_label"
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      {props.type && props.type === "textField"
        ? <TextArea
          rows={props.rows ? props.rows : 4}
          name={props.name}
          placeholder={props.placeholder}
          disabled = {props.disabled}
          value = {props.value}
          onChange={props.handleChange}
          onBlur={props.onBlur}
        />
        : <Input
          name={props.name}
          type={props.htmlFor === "password" ? "password" : "text"}
          placeholder={props.placeholder}
          disabled = {props.disabled}
          value = {props.value}
          onChange={props.handleChange}
          onBlur={props.onBlur}
        />
      }
      {props.error
		  ? <p
			  className="input_error"
			  style={{ fontSize: "10px" }}
		  >
			  {props.error}
		  </p>
		  : null}
    </div>
  );
}

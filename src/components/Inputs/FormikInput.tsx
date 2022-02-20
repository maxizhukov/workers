import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

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
}

export default function FormikInput(
  {name, placeholder, value, disabled, handleChange,
    htmlFor, onBlur, label, style, type, rows}
		: CustomInputProps) {

  return (
    <div
      style={style}
      className="simple_input">
      <label
        className="simple_label"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {type && type === "textField"
        ? <TextArea
          rows={rows ? rows : 4}
          name={name}
          placeholder={placeholder}
          disabled = {disabled}
          value = {value}
          onChange={handleChange}
          onBlur={onBlur}
        />
        : <Input
          name={name}
          type={htmlFor === "password" ? "password" : "text"}
          placeholder={placeholder}
          disabled = {disabled}
          value = {value}
          onChange={handleChange}
          onBlur={onBlur}
        />
      }
    </div>
  );
}

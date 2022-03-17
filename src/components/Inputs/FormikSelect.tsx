import React, {useState} from "react";
import {Select} from "antd";
import "./Inputs.css";

interface IOption {
	value: string;
	title: string;
}

const { Option } = Select;

interface CustomInputProps {
	data: IOption[];
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

export default function FormikSelect(props:CustomInputProps) {

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div
      style={props.style}
      className="formik_select">
      <label
        className="formik_label"
      >
        {props.label}
      </label>
      <Select
		  defaultValue={props.value}
		  placeholder={props.placeholder}
		  disabled={props.disabled}
		  onChange={props.handleChange}
		  onBlur={props.onBlur}
	  >
		  {props.data && props.data.length && props.data.map((option:any) => (
			  <Option
				  value={option.value}
				  key={option.value}
			  >{option.title}</Option>
		  ))}
      </Select>
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

import React, {useState} from "react";
import "./styles.css";
import FormikInput from "../Inputs/FormikInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import Autocomplete from "../Autocomplete/Autocomplete";
import ImageDragAndDrop from "../ImageDragAndDrop/ImageDragAndDrop";
import Button from "../Button/Button";

interface IProps {
	open: boolean
}

export default function OrderInformation(props:IProps) {

  const [files, setFiles] = useState<any>([]);
  const [completed, setCompleted] = useState<any>(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required()
    }),
    onSubmit: async () => {
      console.log("Submit");
    },
  });

  const handleFileUploadChange = (file:any) => {
    setFiles((oldArray:any) => [...oldArray, file] );
  };

  const removeImage = (idx:number) => {
    const copyArray = [...files];
    copyArray.splice(idx, 1);
    setFiles(copyArray);
  };

  return(
    <div className="order_info_box">
      {props.open
        ? <>
			  <FormikInput
				  htmlFor="title"
				  name="title"
				  value={formik.values.title}
				  disabled={false}
				  handleChange={formik.handleChange}
				  onBlur={formik.handleBlur}
				  label={"What service do you need?"}
				  placeholder={"title"}
			  />
			  <div style={{height: "20px"}} />
			  <FormikInput
				  htmlFor="title"
				  name="title"
				  value={formik.values.title}
				  disabled={false}
				  handleChange={formik.handleChange}
				  onBlur={formik.handleBlur}
				  label={"Describe what exactly do you need"}
				  placeholder={"title"}
				  type={"textField"}
				  rows={4}
			  />

			  <div style={{height: "20px"}} />

			  <p style={{marginBottom: 0}}>You can upload up to 5 files as (.png or .jpg)</p>


			  <div className="order_info_box_images_grid">
            <ImageDragAndDrop onFileChanged={(file:any) => handleFileUploadChange(file)}/>
            {files && files.length
              ? files.map((file:any, idx:number) => (
                <div
                  className="order_info_box_image_box"
                  key={idx.toString()}
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(file["0"])})`
                  }}
                >
                  <p
                    className="order_info_box_image_box_close"
                    onClick={() => removeImage(idx)}
                  >
                    X
                  </p>
                </div>
              ))
              : null
            }
			  </div>
          <div style={{height: "20px"}} />
          <Autocomplete
            saveAddress={(address:any) => console.log(address)}
            label={"Adress where work should be completed"}
          />
          <div className="order_info_box_button_box">
            <Button
              text="Submit"
              type="primary"
            />
          </div>
        </>
        : completed
          ? <></>
          : <div className="row">
            <h3 style={{margin: 0}}>Order information</h3>
            <p className="order_time_badge">
              2 min
            </p>
          </div>
      }
    </div>
  );
}

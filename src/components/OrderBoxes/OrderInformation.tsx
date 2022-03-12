import React, {useState} from "react";
import "./styles.css";
import FormikInput from "../Inputs/FormikInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import Autocomplete from "../Autocomplete/Autocomplete";
import ImageDragAndDrop from "../ImageDragAndDrop/ImageDragAndDrop";
import Button from "../Button/Button";
import { notification } from "antd";
import {FormOutlined} from "@ant-design/icons";

interface IProps {
  open: boolean;
  goNext: (values:any) => void;
  openBox: () => void;
}

export default function OrderInformation(props:IProps) {

  const [files, setFiles] = useState<any>([]);
  const [completed, setCompleted] = useState<any>(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      country: "",
      city: "",
      zipCode: "",
      address: ""
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      country: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
      address: Yup.string().required()
    }),
    onSubmit: async (e:any) => {
      setCompleted(true);
      props.goNext(formik.values);
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

  const handleAddressInput = (address:any) => {
    if (address.country && address.city && address.postalCode && address.address) {
      formik.setFieldValue("country", address.country, true);
      formik.setFieldValue("city", address.city, true);
      formik.setFieldValue("zipCode", address.postalCode, true);
      formik.setFieldValue("address", address.address, true);
    } else {
      notification.error({
        message: "Address can not be processed",
        description: "Please select another address, nearest street or village",
      });
    }
  };

  return(
    <div className="order_info_box">
      {props.open
        ? <form onSubmit={(e:any) => formik.handleSubmit(e)}>
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
				  htmlFor="description"
				  name="description"
				  value={formik.values.description}
				  disabled={false}
				  handleChange={formik.handleChange}
				  onBlur={formik.handleBlur}
				  label={"Describe what exactly do you need"}
				  placeholder={"description"}
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
            saveAddress={(address:any) => handleAddressInput(address)}
            label={"Adress where work should be completed"}
          />

          <div className="order_info_box_button_box">
            <Button
              text="Submit"
              type="primary"
              htmlType={"submit"}
              disabled={!(formik.isValid && formik.dirty)}
            />
          </div>
        </form>
        : completed
          ? <div style={{position: "relative"}}>
            <div style={{
              position: "absolute",
              right: 0,
              top: 0
            }}>
              <FormOutlined
                style={{
                  color: "#4157ff",
                  fontSize: "18px",
                  cursor: "pointer"
                }}
                onClick={() => props.openBox()}
              />
            </div>
            <p><strong>What to do:</strong> <span>{formik.values.title}</span></p>
            <p><strong>Description:</strong> <span>{formik.values.description}</span></p>
            <p><strong>Address:</strong> <span>{formik.values.address}</span></p>
          </div>
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

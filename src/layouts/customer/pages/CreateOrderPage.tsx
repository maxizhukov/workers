import React, {useEffect, useState} from "react";
import "./styles.css";
import {useLocation} from "react-router-dom";
import ideaImage from "../../../assets/images/idea.png";
import {Select} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {categoriesService} from "../../../services/categories.service";

const { Option } = Select;

export default function CreateOrderPage() {
  const { state } = useLocation();

  const [categoriesData, setCategoriesData] = useState([]);

  const getData = async () => {
    const categories = await new categoriesService().getAllCategories();
    if (categories && categories.status) {
      setCategoriesData(categories.data);
    }
  };

  useEffect(() => {
    getData();
  });

  const formik = useFormik({
    initialValues: {
      search: "",
      lang: "",
      exampleTitle: "",
      exampleDescription: "",
      parentCategory: "",
      parentSubCategory: ""
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().required(),
      lang: Yup.string().required(),
      exampleTitle: Yup.string().required(),
      exampleDescription: Yup.string().required(),
      parentCategory: Yup.string().required(),
      parentSubCategory: Yup.string().required()
    }),
    onSubmit: async () => {
      console.log("Submit");
    },
  });


  return(
    <div className="order_page">
      <div className="order_page_info_container">
        <img src={ideaImage} alt="idea"/>
        <div>
          <h3>Good to know</h3>
          <p>We will not charge any fee or payments from you!</p>
        </div>
      </div>

      <h3>Please provide an information for your order, so we can find best specialist for you</h3>

      <form>

        <h3 style={{marginTop: "20px"}}>Order Details</h3>

        <p style={{margin: 0}}>Select a category</p>
        <Select
          value={formik.values.parentCategory}
          style={{ marginRight: "15px", minWidth: "250px" }}
          onChange={(value) => {
            formik.setFieldValue("parentCategory", value, true);
          }}>
          {categoriesData && categoriesData.length && categoriesData.map((option:any) => (
            <Option value={option._id} key={option._id}>{option.title}</Option>
          ))}
        </Select>

      </form>
    </div>
  );
}

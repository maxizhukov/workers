import React, {useEffect, useState} from "react";
import "./styles.css";
import {useLocation} from "react-router-dom";
import {Select} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {categoriesService} from "../../../services/categories.service";
import OrderInformation from "../../../components/OrderBoxes/OrderInformation";
import OrderDate from "../../../components/OrderBoxes/OrderDate";
import OrderCategories from "../../../components/OrderBoxes/OrderCategories";
import OrderAuthentication from "../../../components/OrderBoxes/OrderAuthentication";

const { Option } = Select;

export default function CreateOrderPage() {
  const { state } = useLocation();

  const [categoriesData, setCategoriesData] = useState([]);
  const [openContainer, setOpenContainer] = useState(0);

  const getData = async () => {
    const categories = await new categoriesService().getAllCategories();
    if (categories && categories.status) {
      setCategoriesData(categories.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div className="order_page_container">
        <form>

          <h3 className="order_page_container_title">Get rid of bulky items</h3>

          <OrderCategories open={true} />
          <OrderInformation open={true} />
          <OrderDate open={true} />
          <OrderAuthentication open={true} />

        </form>
      </div>
    </div>
  );
}

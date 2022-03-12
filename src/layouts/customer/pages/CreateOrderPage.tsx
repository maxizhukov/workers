import React, {useEffect, useState} from "react";
import "./styles.css";
import OrderInformation from "../../../components/OrderBoxes/OrderInformation";
import OrderDate from "../../../components/OrderBoxes/OrderDate";
import OrderCategories from "../../../components/OrderBoxes/OrderCategories";
import OrderAuthentication from "../../../components/OrderBoxes/OrderAuthentication";
import Button from "../../../components/Button/Button";

export default function CreateOrderPage() {

  const [openContainer, setOpenContainer] = useState(0);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [providedData, setProvidedData] = useState<any>({
    categories: {
      category: {},
      subCategory: {},
      orderType: {}
    },
    information: {
      title: "",
      description: "",
      country: "",
      city: "",
      zipCode: "",
      address: ""
    },
    date: {
      date: "",
      time: ""
    },
    user: {
      email: ""
    }
  });

  useEffect(() => {
    let valid = true;
    Object.keys(providedData).map((providedDataItem:any) => {
      Object.keys(providedData[providedDataItem]).map((providedDataSubItem:string) => {
        if (
          !providedData[providedDataItem][providedDataSubItem]
            && providedData[providedDataItem][providedDataSubItem] !== 0) {
          valid = false;
        }
      });
    });
    if (!userAuthenticated) {
      valid = false;
    }
    setFormIsValid(valid);
  }, [providedData, userAuthenticated]);

  const setValues = (values:any, parent:string) => {
    const copiedData = {...providedData, [parent]: values};
    setProvidedData(copiedData);
  };

  return(
    <div className="order_page">
      <div className="order_page_container">
        <div>
          <h3 className="order_page_container_title">Get rid of bulky items</h3>
          <OrderCategories
            open={openContainer === 0}
            goNext={(values:any) => {
              setValues(values, "categories");
              setOpenContainer(1);
            }}
            openBox={() => setOpenContainer(0)}
          />
          <OrderInformation
            open={openContainer === 1}
            goNext={(values:any) => {
              setValues(values, "information");
              setOpenContainer(2);
            }}
            openBox={() => setOpenContainer(1)}
          />
          <OrderDate
            open={openContainer === 2}
            goNext={(values:any) => {
              setValues(values, "date");
              setOpenContainer(3);
            }}
            openBox={() => setOpenContainer(2)}
          />
          {!userAuthenticated
            ? <OrderAuthentication
              open={openContainer === 3}
              goNext={(values:any) => {
                setValues(values, "user");
                setUserAuthenticated(true);
              }}
            />
            : null
          }

          <Button
            text="Create a contract"
            type={"primary"}
            disabled={!formIsValid}
          />

        </div>
      </div>
      <div style={{height: "30px"}} />
    </div>
  );
}

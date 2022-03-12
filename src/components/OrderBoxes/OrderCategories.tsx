import React, {useEffect, useState} from "react";
import "./styles.css";
import categoryImage from "../../assets/images/category.png";
import {categoriesService} from "../../services/categories.service";
import {subCategoriesService} from "../../services/subCategories.service";
import { Spin } from "antd";
import {orderTypesService} from "../../services/orderTypes.service";
import {FormOutlined} from "@ant-design/icons";
import {CloseOutlined} from "@ant-design/icons";
import Button from "../Button/Button";

interface IProps {
  open: boolean;
  goNext: (values:any) => void;
  openBox: () => void;
}

export default function OrderCategories(props:IProps) {

  useEffect(() => {
    getCategories();
  }, []);

  // Data
  const [categories, setCategories] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [orderTypesData, setOrderTypesData] = useState([]);

  // Loaders
  const [showSubCategoriesLoader, setShowSubCategoriesLoader] = useState(true);
  const [showOrderTypesLoader, setShowOrderTypesLoader] = useState(true);

  // Layout
  const [completed, setCompleted] = useState(false);

  const [selectionState, setSelectionState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>({});
  const [selectedOrderTypesData, setSelectedOrderTypesData] = useState<any>({});

  const [disableButton, setDisableButton] = useState(false);

  const getCategories = async () => {
    await new categoriesService().getAllCategories()
      .then((res:any) => {
        if (res && res.data) {
          setCategories(res.data.data);
        }
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  const getSubCategories = async (categoryId:string) => {
    await new subCategoriesService().getByCategoriesId(categoryId)
      .then((res:any) => {
        if (res && res.data) {
          setSubCategoriesData(res.data.data);
          setShowSubCategoriesLoader(false);
        }
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  const getOrderTypes = async (subCategoryId:string) => {
    await new orderTypesService().getBySubCategoryId(subCategoryId)
      .then((res:any) => {
        if (res && res.data) {
          setOrderTypesData(res.data.data);
          setShowOrderTypesLoader(false);
        }
      })
      .catch((e:any) => {
        console.log(e);
      });
  };

  const handleCategorySelect = (item:any) => {
    setShowSubCategoriesLoader(true);
    getSubCategories(item.id);
    setSelectionState(1);
    setSelectedCategory(item);
  };

  const handleSubCategoryClick = (item:any) => {
    setShowOrderTypesLoader(true);
    getOrderTypes(item.id);
    setSelectionState(2);
    setSelectedSubCategory(item);
  };

  const handleOrderTypeSelect = (orderType:any) => {
    setSelectedOrderTypesData(orderType);
    setCompleted(true);
    props.goNext({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      orderType: orderType
    });
  };

  // Clear states

  const clearCategoryState = () => {
    setSelectionState(0);
    setSelectedCategory({});
    setSelectedSubCategory({});
    setSelectedOrderTypesData({});
  };

  const clearSubCategoryState = () => {
    setSelectionState(1);
    setSelectedSubCategory({});
    setSelectedOrderTypesData({});
  };

  const clearOrderTypeState = () => {
    setSelectionState(2);
    setSelectedOrderTypesData({});
  };

  useEffect(() => {
    if (
      Object.keys(selectedCategory)
        && Object.keys(selectedCategory).length
      && Object.keys(selectedSubCategory)
      && Object.keys(selectedSubCategory).length
        && Object.keys(selectedOrderTypesData)
        && Object.keys(selectedOrderTypesData).length
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [selectedCategory, selectedSubCategory, selectedOrderTypesData]);

  return(
    <div className="order_info_box">
      {props.open
        ? <>
          <h4>Select category</h4>
          <div className="order_categories_grid">
            {selectionState > 0
              ? <div
                className="order_categories_grid_item"
              >
                <img src={categoryImage} alt="category" />
                <p>{selectedCategory.title}</p>
                <CloseOutlined
                  className="order_categories_grid_item_close"
                  onClick={() => clearCategoryState()}
                />
              </div>
              : categories && categories.length && categories.map((categoryItem:any) => (
                <div
                  className="order_categories_grid_item"
                  key={categoryItem.id}
                  onClick={() => handleCategorySelect(categoryItem)}
                >
                  <img src={categoryImage} alt="category" />
                  <p>{categoryItem.title}</p>
                </div>
              ))
            }
          </div>
          {selectionState > 0
            ? Object.keys(selectedSubCategory).length
              ? <>
                <h4 style={{marginTop: "10px"}}>Select service</h4>
                <div className="order_info_box_sub_category_selected_box">
                  <p>{selectedSubCategory.title}</p>
                  <CloseOutlined
                    className="order_info_box_sub_category_selected_box_close"
                    onClick={() => clearSubCategoryState()}
                  />
                </div>
              </>
              : <>
                {showSubCategoriesLoader
                  ? <div className="center">
                    <Spin />
                  </div>
                  : <>
                    <h4 style={{marginTop: "10px"}}>Select service</h4>
                    <div className="order_categories_grid">
                      {subCategoriesData.map((subCategoryItem:any) => (
                        <p
                          className="order_info_box_sub_category"
                          key={subCategoryItem.id}
                          onClick={() => handleSubCategoryClick(subCategoryItem)}
                        >
                          {subCategoryItem.title}
                        </p>
                      ))}
                    </div>
                  </>
                }
              </>
            : null
          }
          {selectionState === 2
            ? <>
              <h4 style={{marginTop: "10px"}}>Order type</h4>
              {Object.keys(selectedOrderTypesData).length
                ? <div className="order_info_box_sub_category_selected_box">
                  <p>{selectedOrderTypesData.title}</p>
                  <CloseOutlined
                    className="order_info_box_sub_category_selected_box_close"
                    onClick={() => clearOrderTypeState()}
                  />
                </div>
                : showOrderTypesLoader
                  ? <div className="center">
                    <Spin />
                  </div>
                  : <div className="order_categories_grid">
                    {orderTypesData.map((orderTypesItem:any) => (
                      <p
                        className="order_info_box_sub_category"
                        key={orderTypesItem.id}
                        onClick={() => handleOrderTypeSelect(orderTypesItem)}
                      >
                        {orderTypesItem.title}
                      </p>
                    ))}
                  </div>
              }
            </>
            : null
          }
          <div className="order_info_box_button_box">
            <Button
              text="Submit"
              type="primary"
              disabled={disableButton}
              onClick={() => props.goNext({
                category: selectedCategory,
                subCategory: selectedSubCategory,
                orderType: selectedOrderTypesData
              })}
            />
          </div>
        </>
        : completed
          ? <div className="space-between">
            <div className="row">
              <span>{selectedCategory.title}</span>
              <span style={{marginLeft: "5px", marginRight: "5px"}}>
                {">"}
              </span>
              <span>{selectedSubCategory.title}</span>
              <span style={{marginLeft: "5px", marginRight: "5px"}}>
                {">"}
              </span>
              <span>{selectedOrderTypesData.title}</span>
            </div>
            <FormOutlined
              style={{
                color: "#4157ff",
                fontSize: "18px",
                cursor: "pointer"
              }}
              onClick={() => props.openBox()}
            />
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

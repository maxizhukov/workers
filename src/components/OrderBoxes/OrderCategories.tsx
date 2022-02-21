import React, {useEffect, useState} from "react";
import "./styles.css";
import categoryImage from "../../assets/images/category.png";
import {categoriesService} from "../../services/categories.service";
import {subCategoriesService} from "../../services/subCategories.service";
import { Spin } from "antd";
import {orderTypesService} from "../../services/orderTypes.service";
import Button from "../Button/Button";

interface IProps {
	open: boolean;
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

  const [selectionState, setSelectionState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedOrderTypesData, setSelectedOrderTypesData] = useState({});

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

  return(
    <div className="order_info_box">
      <h4>Select category</h4>
      <div className="order_categories_grid">
        {selectionState > 0
          ? <div
            className="order_categories_grid_item"
          >
            <img src={categoryImage} alt="category" />
            <p>{selectedCategory.title}</p>
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
        ? <>
          <h4 style={{marginTop: "10px"}}>Select service</h4>
          {showSubCategoriesLoader
            ? <div className="center">
              <Spin />
            </div>
            : <div className="order_categories_grid">
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
          }
        </>
        : null
      }
      {selectionState === 2
        ? <>
          <h4 style={{marginTop: "10px"}}>Order type</h4>
          {showOrderTypesLoader
            ? <div className="center">
              <Spin />
            </div>
            : <div className="order_categories_grid">
              {orderTypesData.map((orderTypesItem:any) => (
                <p
                  className="order_info_box_sub_category"
                  key={orderTypesItem.id}
                  onClick={() => setSelectedOrderTypesData(orderTypesItem)}
                >
                  {orderTypesItem.title}
                </p>
              ))}
            </div>
          }
        </>
        : null
      }
    </div>
  );
}

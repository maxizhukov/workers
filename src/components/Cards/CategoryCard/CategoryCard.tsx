import React from "react";
import "./CategoryCard.css";
import categoryCardImage from "../../../assets/images/category.png";

interface IProps {
	data: any
}

export default function CategoryCard(props:IProps) {
  return(
    <div className="category_card">
      <div className="row">
		  <img
			  src={categoryCardImage}
			  alt="category"
			  className="category_card_img"
		  />
		  <p className="category_card_title">
			  Home repairs
		  </p>
		  <p className="category_card_number">
			  32 Verified workers
		  </p>
      </div>
      <div className="category_card_list">
		  <div className="category_card_list_item">
			  <p style={{
			  	color: "#4361EE",
				  cursor: "pointer"
			  }}>
				  Replace a Toilet
			  </p>
		  </div>
	  </div>
    </div>
  );
}

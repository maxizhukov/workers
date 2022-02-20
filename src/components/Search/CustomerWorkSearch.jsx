import React, {useCallback, useState} from "react";
import {requestHandler} from "../../utils/requestHandler";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import TypeAnimation from "react-type-animation";

export default function CustomerWorkSearch(props) {
  const navigate = useNavigate();

  const [search, setSearch] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);

  const debounce = (func) => {
    let timer;
    return function (...args){
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 300);
    };
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    requestHandler({
      path: "general/searchWork",
      method: "GET",
      params: {
        key: value
      }
    }).then((res) => {
      console.log(res.data);
      if (res && res.status === 200) {
        setSearch(res.data.data);
      } else {
        setSearch([]);
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  const handleInputChange = useCallback(debounce(handleSearch), []);

  const navigateToOrder = (data) => {
    navigate("/createOrder", {
      state: {
        searchId: data.id,
        search: data.search,
        category: data.category.key,
        subCategory: data.subCategory.key
      }
    });
  };

  const animationSequence = [
    "Repair iPhone screen",
    1000,
    "Help with learning Russian",
    1000,
    "Take care in garden",
    1000,
  ];

  return(
    <div>
      <div className="customer_search" onClick={() => setShowAnimation(false)}>
        {showAnimation
          ? <div
            style={{
              paddingLeft: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div></div>
            <TypeAnimation
              cursor={true}
              sequence={animationSequence}
              wrapper="p"
              repeat={Infinity}
              className="animation_input_text"
            />
          </div>
          : <input
            type="text"
            onChange={handleInputChange}
            autoFocus
          />
        }
        <button onClick={() => console.log("Btn")}>
          Find a contractor
        </button>
      </div>
      {search?.length > 0 ?
        <div className="main_search_box">
          {search.map((element, idx) => (
            <div
              className="main_search_box_item"
              key={element.id}
              onClick={() => navigateToOrder(element)}
            >
              <p>{element.category.title}</p>
              <p>{">"}</p>
              <p>{element.subCategory.title}</p>
              <p>{">"}</p>
              <p>{element.orderType.title}</p>
              <p>{">"}</p>
              <p >{element.search}</p>
            </div>
          ))}
        </div>
        : null
      }
    </div>
  );
}

import React, {useEffect, useState} from "react";
import "./DateCarousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrowImage from "../../assets/images/caret.png";
import moment from "moment";
import {useTranslation} from "react-i18next";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CustomRightArrow = ({ onClick, ...rest }:any) => {
  return <img
    src={arrowImage}
    alt="arrow"
    style={{
      position: "absolute",
      right: "0px",
      transform: "rotate(90deg)",
      width: "20px",
      cursor: "pointer"
    }}
    onClick={() => onClick()}
  />;
};

const CustomLeftArrow = ({ onClick, ...rest }:any) => {
  return <img
    src={arrowImage}
    alt="arrow"
    style={{
      position: "absolute",
      left: "0px",
      transform: "rotate(-90deg)",
      width: "20px",
      cursor: "pointer"
    }}
    onClick={() => onClick()}
  />;
};

interface IProps {
  setSelectedDate: (date:string) => void;
}

export default function DateCarousel(props:IProps) {
  const { t } = useTranslation();

  const [dates, setDates] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const someDate = new Date();
    const generatedDates = getDates(new Date(), someDate.setDate(someDate.getDate() + 10));
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]);
  }, []);

  const getDates = (startDate:any, endDate:any) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format("YYYY-MM-DD") );
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  };

  const handleSelectDate = (date:any) => {
    setSelectedDate(date);
    props.setSelectedDate(date);
  };

  return(
    <Carousel
      responsive={responsive}
      autoPlaySpeed={99999999999999}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      sliderClass={"sliderClass"}
    >
      {dates && dates.length
        ? dates.map((date:any, idx:number) => (
          <div
            className={date === selectedDate
              ? "carousel_date_container selected"
              : "carousel_date_container"
            }
            key={date}
            onClick={() => handleSelectDate(date)}
          >
            <div>
              <p className={date === selectedDate
                ? "carousel_date_container_month selected"
                : "carousel_date_container_month"
              }>
                {t(`dates.months.${moment(date).format("MM")}`)}
              </p>
              <p className={date === selectedDate
                ? "carousel_date_container_date selected"
                : "carousel_date_container_date"
              }>
                {moment(date).format("DD")}
              </p>
              <p className={date === selectedDate
                ? "carousel_date_container_day selected"
                : "carousel_date_container_day"
              }>
                {t(`dates.days.${moment(date).day()}`)}
              </p>
            </div>
          </div>
        ))
        : <></>
      }
    </Carousel>
  );
}

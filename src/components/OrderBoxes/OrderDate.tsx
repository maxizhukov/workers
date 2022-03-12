import React, {useState} from "react";
import "./styles.css";
import DateCarousel from "../Carousels/DateCarousel";
import { Radio } from "antd";
import Button from "../Button/Button";
import {FormOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import moment from "moment";

interface IProps {
  open: boolean;
  goNext: (values:any) => void;
  openBox: () => void;
}

export default function OrderDate(props:IProps) {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  const onRadioChange = (e:any) => {
    setSelectedTime(e.target.value);
  };

  return(
    <div className="order_info_box">
      {props.open
        ? <>
          <h4>Select a date when your order should be completed</h4>
          <DateCarousel setSelectedDate={setSelectedDate} />
          <h4 style={{marginTop: "20px"}}>Select a time range</h4>
          <div className="row">
            <Radio.Group onChange={onRadioChange} value={selectedTime}>
              {Array.from(Array(4).keys()).map((number:number, idx:number) => (
                <Radio
                  value={idx}
                  style={{marginRight: "15px"}}
                  key={idx.toString()}
                >
                  {t(`dates.time_ranges.${idx}`)}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="order_info_box_button_box">
            <Button
              text="Submit"
              type="primary"
              disabled={!selectedDate}
              onClick={() => {
                setCompleted(true);
                props.goNext({
                  date: selectedDate,
                  time: selectedTime
                });
              }}
            />
          </div>
        </>
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
            <p><strong>Date:</strong> <span>
              {moment(selectedDate, "YYYY-MM-DD").format("DD.MM.YYYY")}
            </span></p>
            <p><strong>Time:</strong> <span>{t(`dates.time_ranges.${selectedTime}`)}</span></p>
          </div>
          : <div className="row">
            <h3 style={{margin: 0}}>Select a date</h3>
            <p className="order_time_badge">
            30 sec
            </p>
          </div>
      }
    </div>
  );
}

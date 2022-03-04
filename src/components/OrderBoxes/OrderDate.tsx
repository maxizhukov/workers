import React, {useState} from "react";
import "./styles.css";
import DateCarousel from "../Carousels/DateCarousel";
import { Radio } from "antd";
import Button from "../Button/Button";

interface IProps {
	open: boolean;
}

export default function OrderDate(props:IProps) {
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
          <DateCarousel />
          <h4 style={{marginTop: "20px"}}>Select a time range</h4>
          <div className="row">
            <Radio.Group onChange={onRadioChange} value={selectedTime}>
              <Radio value={0} style={{marginRight: "15px"}}>
                            Any time
              </Radio>
              <Radio value={1} style={{marginRight: "15px"}}>
                            From 8:00 to 12:00
              </Radio>
              <Radio value={2} style={{marginRight: "15px"}}>
                            From 12:00 to 18:00
              </Radio>
              <Radio value={3} style={{marginRight: "15px"}}>
                            From 18:00 to 22:00
              </Radio>
            </Radio.Group>
          </div>
          <div className="order_info_box_button_box">
            <Button
              text="Submit"
              type="primary"
            />
          </div>
        </>
        : completed
          ? <></>
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

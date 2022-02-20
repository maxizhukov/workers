import React, {useEffect, useRef, useState} from "react";
import {Input, List} from "antd";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import "./Autocomplete.css";

interface IProps {
  saveAddress: (address:any) => void
  label: string
}

export default function Autocomplete(props:IProps) {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: "AIzaSyAbuhXyXyLE5wq8mMth9XNq3pt5eRjmgJI",
    options: {
      types: ["address"],
      componentRestrictions: { country: "at" }
    }});

  // Detect click outside for close menu
  const menuRef = useRef<any>(null);

  useEffect(() => {
    const handler = (event:any) => {
      if (!menuRef.current?.contains(event.target)) {
        setShowLocationsMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [value, setValue] = useState("");

  const [showLocationsMenu, setShowLocationsMenu] = useState(false);

  const onPlaceSelected = (place:any) => {
    setShowLocationsMenu(false);
    setValue(place.description);
    if (place.description) {
      const text = place.description;
      placesService?.getDetails(
			  {
			    placeId: place.place_id,
			  },
			  () => {
				  console.log(text);
			  }
      );
    }
  };

  return(
    <div>
      <p style={{marginBottom: 0}}>{props.label}</p>
      <Input.Search
        value={value}
        onChange={(evt) => {
          setShowLocationsMenu(true);
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
        }}
        loading={isPlacePredictionsLoading}
      />
      <div ref={menuRef}>
        {placePredictions.length && showLocationsMenu
          ? !isPlacePredictionsLoading && (
            <List
              style={{fontSize: "14px"}}
              dataSource={placePredictions}
              renderItem={(item) => (
                <List.Item
                  style={{cursor: "pointer", paddingTop: "7px", paddingBottom: "7px"}}
                  onClick={() => onPlaceSelected(item)}>
                  <List.Item.Meta title={item.description} />
                </List.Item>
              )}
            />
          )
          : null
        }

      </div>

    </div>
  );
}

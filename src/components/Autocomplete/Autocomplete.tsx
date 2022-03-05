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
      fetchDetails: true,
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

  const [value, setValue] = useState<any>(null);

  const [showLocationsMenu, setShowLocationsMenu] = useState(false);

  const onPlaceSelected = (place:any) => {
    setShowLocationsMenu(false);
    placesService.getDetails({
      // eslint-disable-next-line max-len
      placeId: place.place_id,
      fields: ["address_components"]
    }, (res:any) => {
      let result = {
        country: "",
        city: "",
        postalCode: "",
        address: ""
      };
      // Extract country, city and postal code
      let houseNumber = "";
      res.address_components.map((addressComponent:any) => {
        // Extract country
        if (addressComponent.types.includes("country")) {
          result = {...result, country: addressComponent.short_name};
        }
        // Extract city
        if (addressComponent.types.includes("locality")) {
          result = {...result, city: addressComponent.long_name};
        }
        // Extract postal code
        if (addressComponent.types.includes("postal_code")) {
          result = {...result, postalCode: addressComponent.long_name};
        }
        // Extract full address
        // Street
        if (addressComponent.types.includes("route")) {
          result = {...result, address: addressComponent.long_name};
        }
        // Number

        if (addressComponent.types.includes("street_number")) {
          houseNumber = addressComponent.long_name;
        }
      });
      if (houseNumber) {
        result = {...result, address: result.address + " " + houseNumber};
      }
      setValue(`${result.address}, ${result.postalCode}, ${result.city}`);
      props.saveAddress(result);
    });
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

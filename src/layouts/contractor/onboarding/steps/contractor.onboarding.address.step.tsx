import React, {useState} from "react";
import "./styles.css";
import moment, {Moment} from "moment";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import Autocomplete from "../../../../components/Autocomplete/Autocomplete";
import {IAutocomplete} from "../../../../interface/component.interface";
import Button from "../../../../components/Button/Button";

interface IData {
	country: string;
	city: string;
	postalCode: string;
	address: string;
}

interface IProps {
	data: IData,
	goNext: (values:IData) => void;
}

export default function ContractorOnboardingAddressStep(props:IProps) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      postalCode: "",
      address: ""
    },
    validationSchema: Yup.object({
      country: Yup.string().required(),
      city: Yup.string().required(),
      postalCode: Yup.string().required(),
      address: Yup.string().required()
    }),
    // handle form submitting
    onSubmit: async () => {
      console.log("Submit");
    },
  });

  const handleAddressChange = (values:IAutocomplete) => {
  	Object.keys(values).map((valueKey:string) => {
  		formik.setFieldValue(valueKey, values[valueKey], true);
    });
  };

  return(
    <div>
      <Autocomplete
		  style={{
		  	maxWidth: "240px"
		  }}
        saveAddress={(address:any) => handleAddressChange(address)}
        label={t("contractor.home.onboarding.stepper.info.labels.address_autocomplete")}
      />

      <div style={{height: "10px"}} />

      <Button
        text={t("contractor.home.onboarding.stepper.btns.next")}
        type={"primary"}
        onClick={() => props.goNext(formik.values)}
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          width: "240px"
        }}
        disabled={!(formik.isValid && formik.dirty)}
      />

    </div>
  );
}

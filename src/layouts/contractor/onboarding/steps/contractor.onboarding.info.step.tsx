import React, {useEffect, useState} from "react";
import "./styles.css";
import {connect} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import FormikInput from "../../../../components/Inputs/FormikInput";
import Button from "../../../../components/Button/Button";
import FormikSelect from "../../../../components/Inputs/FormikSelect";
import { DatePicker } from "antd";
import moment, {Moment} from "moment";

interface IData {
	firstName: string;
	lastName: string;
	sex: string;
	birth: Moment;
}

interface IProps {
	data: IData,
	user?: any;
	goNext: (values:IData) => void;
}

function ContractorOnboardingInfoStep(props:IProps) {
  const { t } = useTranslation();

  const sexOptions = [
	  {
		  value: "m",
		  title: "Man"
	  },
	  {
		  value: "w",
		  title: "Woman"
	  },
	  {
		  value: "d",
		  title: "Diverse"
	  }
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      sex: "m",
      birth: moment(new Date())
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t(
        "validation.required",
        {field: t("contractor.home.onboarding.stepper.info.labels.firstName")}
      )),
      lastName: Yup.string().required(t(
        "validation.required",
        {field: t("contractor.home.onboarding.stepper.info.labels.lastName")}
      )),
      sex: Yup.string().required(t(
        "validation.required",
        {field: t("contractor.home.onboarding.stepper.info.labels.sex")}
      )),
      birth: Yup.string().required(t(
        "validation.required",
        {field: t("contractor.home.onboarding.stepper.info.labels.birth")}
      ))
    }),
    // handle form submitting
    onSubmit: async () => {
      console.log("Submit");
    },
  });

  useEffect(() => {
    if (props.data && props.data.firstName) {
      formik.setFieldValue("firstName", props.data.firstName);
      formik.setFieldValue("lastName", props.data.lastName);
      formik.setFieldValue("sex", props.data.sex);
      formik.setFieldValue("birth", moment(props.data.birth));
    } else {
      formik.setFieldValue("firstName", props.user.userInformation.firstName);
      formik.setFieldValue("lastName", props.user.userInformation.lastName);
    }
  }, [props.data, props.user]);

  return(
	  <form onSubmit={formik.handleSubmit}>
		  <FormikInput
			  htmlFor="firstName"
			  name="firstName"
			  value={formik.values.firstName}
			  disabled={false}
			  handleChange={formik.handleChange}
			  onBlur={formik.handleBlur}
			  label={t("contractor.home.onboarding.stepper.info.labels.firstName")}
			  placeholder={t("authentication.placeholders.firstName")}
			  style={{
				  width: "240px"
			  }}
			  error={
			  	formik.errors.firstName &&
				formik.touched.firstName
            ? formik.errors.firstName
            : undefined
			  }
		  />

		  <div style={{height: "10px"}} />

		  <FormikInput
			  htmlFor="lastName"
			  name="lastName"
			  value={formik.values.lastName}
			  disabled={false}
			  handleChange={formik.handleChange}
			  onBlur={formik.handleBlur}
			  label={t("contractor.home.onboarding.stepper.info.labels.lastName")}
			  placeholder={t("authentication.placeholders.lastName")}
			  style={{
				  width: "240px"
			  }}
			  error={
				  formik.errors.lastName &&
				  formik.touched.lastName
					  ? formik.errors.lastName
					  : undefined
			  }
		  />

		  <div style={{height: "10px"}} />

		  <FormikSelect
			  style={{
				  width: "240px"
			  }}
			  value={formik.values.sex}
			  disabled={false}
			  handleChange={(value:any) => formik.setFieldValue("sex", value, true)}
			  label={t("contractor.home.onboarding.stepper.info.labels.sex")}
			  data={sexOptions}
		  />

		  <div style={{height: "10px"}} />

		  <div
			  className="formik_select">
			  <label
				  className="formik_label"
			  >
				  {t("contractor.home.onboarding.stepper.info.labels.birth")}
			  </label>
			  <DatePicker
				  defaultValue={formik.values.birth}
				  onChange={(value:any) => {
					  formik.setFieldValue("birth", moment(value), true);
				  }}
				  style={{
				  	maxWidth: "240px"
				  }}
			  />
		  </div>

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

	  </form>
  );
}

const mapStateToProps = (state:RootState) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(ContractorOnboardingInfoStep);

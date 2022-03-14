import React, {useEffect} from "react";
import "./styles.css";
import {connect} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import {useFormik} from "formik";
import * as Yup from "yup";
import {customerAuthenticationService} from "../../../../services/customer.authentication.service";
import {useTranslation} from "react-i18next";
import FormikInput from "../../../../components/Inputs/FormikInput";
import Button from "../../../../components/Button/Button";

interface IProps {
	data: {
		firstName: string;
		lastName: string;
		sex: string;
		birth: string;
	},
	user?: any
}

function ContractorOnboardingInfoStep(props:IProps) {
  const { t } = useTranslation();

  useEffect(() => {
  	if (props.data && props.data.firstName) {
  		formik.setFieldValue("firstName", props.data.firstName);
      formik.setFieldValue("lastName", props.data.lastName);
      formik.setFieldValue("sex", props.data.sex);
      formik.setFieldValue("birth", props.data.birth);
    } else {
      formik.setFieldValue("firstName", props.user.userInformation.firstName);
      formik.setFieldValue("lastName", props.user.userInformation.lastName);
    }
  }, [props.data, props.user]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      sex: "",
      births: ""
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
      births: Yup.string().required(t(
        "validation.required",
        {field: t("contractor.home.onboarding.stepper.info.labels.birth")}
      ))
    }),
    // handle form submitting
    onSubmit: async () => {
      console.log("Submit");
    },
  });

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

		  <Button
			  text={t("authentication.registration.registerButton")}
			  type={"primary"}
			  htmlType={"submit"}
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

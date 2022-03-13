import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import FormikInput from "../../../components/Inputs/FormikInput";
import Button from "../../../components/Button/Button";

export default function ContractorRegisterPage() {
  const { t } = useTranslation();

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
    	firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.firstName")}
      )),
      lastName: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.lastName")}
      )),
      email: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.email")}
      )).email(t("validation.emailValidation")),
      password: Yup.string()
        .required(t(
          "validation.required",
          {field: t("authentication.labels.password")}
        ))
        .min(8, t("validation.passwordLength"))
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[!?=+-@#$%^&*A-Za-zÜüÖöÄäß\d]{8,50}$/,
          t("validation.passwordValidation")
        ),
      confirmPassword: Yup.string()
        .required("")
        .when("password", {
          is: (val:any) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            t("authentication.validations.confirmPassword")
          ),
        })
    }),
    onSubmit: async (e:any) => {
      console.log("Submit");
    },
  });

  return(
    <form className="contractor_auth_page_content_box">
      <h1>{t("contractor.auth.register.title")}</h1>

      <FormikInput
        htmlFor="firstName"
        name="firstName"
        value={formik.values.firstName}
        disabled={false}
        handleChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={t("authentication.labels.firstName")}
        placeholder={t("authentication.placeholders.firstName")}
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
        label={t("authentication.labels.lastName")}
        placeholder={t("authentication.placeholders.lastName")}
        error={
          formik.errors.lastName &&
            formik.touched.lastName
            ? formik.errors.lastName
            : undefined
        }
      />

      <div style={{height: "10px"}} />

      <FormikInput
        htmlFor="email"
        name="email"
        value={formik.values.email}
        disabled={false}
        handleChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={t("authentication.labels.email")}
        placeholder={t("authentication.placeholders.email")}
        error={formik.errors.email && formik.touched.email ? formik.errors.email : undefined}
      />

      <div style={{height: "10px"}} />

      <FormikInput
        htmlFor="password"
        name="password"
        value={formik.values.password}
        disabled={false}
        handleChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={t("authentication.labels.password")}
        placeholder={t("authentication.placeholders.password")}
        error={
          formik.errors.password
					&& formik.touched.password
            ? formik.errors.password
            : undefined}
      />

      <div style={{height: "10px"}} />

      <FormikInput
        htmlFor="confirmPassword"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        disabled={false}
        handleChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={t("authentication.labels.confirmPassword")}
        placeholder={t("authentication.placeholders.confirmPassword")}
        error={
          formik.errors.confirmPassword &&
            formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : undefined
        }
      />

      <div style={{height: "10px"}} />

      <Button
        text={t("authentication.registration.registerButton")}
        type={"primary"}
        htmlType={"submit"}
        style={{
          width: "100%"
        }}
        disabled={!(formik.isValid && formik.dirty)}
        loading={submitButtonLoading}
      />

      <p style={{
        textAlign: "center",
        marginTop: "20px"
      }}>
        <Link to={"/contractor/auth/login"}>
          {t("contractor.auth.register.login")}
        </Link>
      </p>

    </form>
  );
}

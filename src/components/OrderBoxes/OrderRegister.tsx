import React from "react";
import "./styles.css";
import GoogleLogin from "react-google-login";
import GoogleLogo from "../../assets/images/google_logo.png";
import {useFormik} from "formik";
import * as Yup from "yup";
import FormikInput from "../Inputs/FormikInput";
import Button from "../Button/Button";
import {useTranslation} from "react-i18next";
import {customerAuthenticationService} from "../../services/customer.authentication.service";

interface IProps {
  goNext: (values:any) => void;
}

export default function OrderRegister(props:IProps) {
  const { t } = useTranslation();

  const responseGoogle = async (res:any) => {
    console.log(res);
  };

  const googleId = "228817551028-7fbvfj5h2h5m2ultef5gsbkbgc4gco6u.apps.googleusercontent.com";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.firstName")}
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
    // handle form submitting
    onSubmit: async () => {
      // Removing confirm password
      const {confirmPassword, ...registerData} = formik.values;
      const registerResponse = await new customerAuthenticationService().register(registerData);
      if (registerResponse && registerResponse.status) {
        props.goNext(registerData.email);
      }
    },
  });

  return(
    <div className="center">
      <div className="order_auth_register_box">
        <GoogleLogin
          clientId={googleId}
          render={renderProps => (
            <button
              className="google_btn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}>
              <div className="row">
                <img src={GoogleLogo} className="google_btn_logo" alt="google"/>
                Register with google
              </div>
            </button>
          )}
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="auth_line_box">
          <div className="auth_line" />
          <p className="auth_line_text">or register with email</p>
          <div className="auth_line" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput
            htmlFor="name"
            name="name"
            value={formik.values.name}
            disabled={false}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("authentication.labels.firstName")}
            placeholder={t("authentication.placeholders.firstName")}
            style={{
              width: "240px"
            }}
            error={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}
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
            style={{
              width: "240px"
            }}
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
            style={{
              width: "240px"
            }}
            error={
              formik.errors.password
              && formik.touched.password
                ? formik.errors.password
                : undefined}
          />

          <div style={{height: "10px"}} />

          <FormikInput
            htmlFor="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            disabled={false}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("authentication.labels.confirmPassword")}
            placeholder={t("authentication.placeholders.confirmPassword")}
            style={{
              width: "240px"
            }}
            error={
              formik.errors.confirmPassword
                && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined}
          />

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
      </div>
    </div>
  );
}

import React from "react";
import "./styles.css";
import GoogleLogin from "react-google-login";
import GoogleLogo from "../../assets/images/google_logo.png";
import {useFormik} from "formik";
import * as Yup from "yup";
import FormikInput from "../Inputs/FormikInput";
import Button from "../Button/Button";

export default function OrderLogin() {

  const responseGoogle = async (res:any) => {
    console.log(res);
  };

  const googleId = "228817551028-7fbvfj5h2h5m2ultef5gsbkbgc4gco6u.apps.googleusercontent.com";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email").required("required"),
      password: Yup.string()
        .required("required")
        .min(8, "min length")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[!?=+-@#$%^&*A-Za-zÜüÖöÄäß\d]{8,50}$/, "Match")
    }),
    // handle form submitting
    onSubmit: async () => {
      console.log("Submit");
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
								Login with google
              </div>
            </button>
          )}
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="auth_line_box">
          <div className="auth_line" />
          <p className="auth_line_text">or login with email</p>
          <div className="auth_line" />
        </div>
        <form onSubmit={formik.handleSubmit}>

          <div style={{ position: "relative" }}>
            <FormikInput
              htmlFor="email"
              name="email"
              value={formik.values.email}
              disabled={false}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={"Email"}
              placeholder="mail@mail.at"
              style={{
                width: "240px"
              }}
            />
            {formik.errors.email && formik.touched.email && (
              <p
                className="input_error"
                style={{ fontSize: "10px" }}
              >
                {formik.errors.email}
              </p>
            )}
          </div>

          <div style={{height: "10px"}} />

          <div style={{ position: "relative" }}>
            <FormikInput
              htmlFor="password"
              name="password"
              value={formik.values.password}
              disabled={false}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={"Password"}
              placeholder="******"
              style={{
                width: "240px"
              }}
            />
            {formik.errors.password && formik.touched.password && (
              <p
                className="input_error"
                style={{ fontSize: "10px" }}
              >
                {formik.errors.password}
              </p>
            )}
          </div>

          <Button
            text={"Login"}
            type={"primary"}
            htmlType={"submit"}
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              width: "240px"
            }}
          />

        </form>
      </div>
    </div>
  );
}

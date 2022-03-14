import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import FormikInput from "../../../components/Inputs/FormikInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import {Link} from "react-router-dom";
// eslint-disable-next-line max-len
import {contractorAuthenticationService} from "../../../services/contractor/contractors.authentication.service";

export default function ContractorLoginPage() {
  const { t } = useTranslation();

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.email")}
      )).email(t("validation.emailValidation")),
      password: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.password")}
      ))
    }),
    onSubmit: async (e:any) => {
      setSubmitButtonLoading(true);
      await new contractorAuthenticationService().login(formik.values);
      setSubmitButtonLoading(false);
    },
  });

  return(
    <form className="contractor_auth_page_content_box" onSubmit={formik.handleSubmit}>
      <h1>{t("contractor.auth.login.title")}</h1>
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

      <div style={{
        marginTop: "15px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <Link to={"/contractor/auth/forgot"}>
          {t("contractor.auth.login.forgot")}
        </Link>
      </div>

      <Button
        text={t("authentication.login.loginButton")}
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
        <Link to={"/contractor/auth/register"}>
          {t("contractor.auth.login.register")}
        </Link>
      </p>

    </form>
  );
}

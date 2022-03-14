import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import FormikInput from "../../../components/Inputs/FormikInput";
import Button from "../../../components/Button/Button";

export default function ContractorForgetPage() {
  const { t } = useTranslation();

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(t(
        "validation.required",
        {field: t("authentication.labels.email")}
      )).email(t("validation.emailValidation"))
    }),
    onSubmit: async (e:any) => {
      console.log("Send");
    },
  });

  return(
    <form className="contractor_auth_page_content_box">
      <h1>{t("contractor.auth.forget.title")}</h1>

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

      <Button
        text={t("contractor.auth.forget.btn")}
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

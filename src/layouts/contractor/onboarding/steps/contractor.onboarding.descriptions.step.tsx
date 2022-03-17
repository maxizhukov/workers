import React from "react";
import "./styles.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import FormikInput from "../../../../components/Inputs/FormikInput";
// eslint-disable-next-line max-len
import MultipleFileUploadWithPreview from "../../../../components/FileUploaders/MultipleUploadWithPreview";
import Button from "../../../../components/Button/Button";

interface IData {
	description: string;
	certificates: string[];
	images: string[]
}

interface IProps {
	data: IData,
	goNext: (values:IData) => void;
}

export default function ContractorOnboardingDescriptionStep(props:IProps) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      description: "",
      certificates: [],
      images: []
    },
    validationSchema: Yup.object({
      description: Yup.string(),
      certificates: Yup.array(),
      images: Yup.array()
    }),
    // handle form submitting
    onSubmit: async () => {
      console.log("Submit");
    },
  });

  const handleImagesUploader = (key:string, images:string[]) => {
    formik.setFieldValue(key, images, true);
  };

  return(
    <div>
      <FormikInput
        type={"textField"}
        rows={4}
        htmlFor={"description"}
        name={"description"}
        value={formik.values.description}
        disabled={false}
        handleChange={formik.handleChange}
        label={t("contractor.home.onboarding.stepper.info.labels.description")}
        style={{maxWidth: "400px"}}
      />

      <div style={{height: "10px"}} />

      <p>{t("contractor.home.onboarding.stepper.description.labels.certificates")}</p>
      <MultipleFileUploadWithPreview
        onChange={(files:string[]) => handleImagesUploader("images", files)}
      />

      <div style={{height: "10px"}} />

      <p>{t("contractor.home.onboarding.stepper.description.labels.images")}</p>
      <MultipleFileUploadWithPreview
        onChange={(files:string[]) => handleImagesUploader("certificates", files)}
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
        disabled={false}
      />

    </div>
  );
}

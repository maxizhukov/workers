import React, {useState} from "react";
import "./styles.css";
// eslint-disable-next-line max-len
import MultipleFileUploadWithPreview from "../../../../components/FileUploaders/MultipleUploadWithPreview";
import Button from "../../../../components/Button/Button";
import {useTranslation} from "react-i18next";

interface IData {
	pass: string;
}

interface IProps {
	data: IData,
	goNext: (values:IData) => void;
}

export default function ContractorOnboardingVerificationStep(props:IProps) {
  const { t } = useTranslation();

  const [file, setFile] = useState("");

  const handleImagesUploader = (files:string[]) => {
  	setFile(files[0]);
  };

  return(
    <div>
      <p>{t("contractor.home.onboarding.stepper.description.labels.images")}</p>
      <MultipleFileUploadWithPreview
        onChange={(files:string[]) => handleImagesUploader(files)}
      />

      <div style={{height: "10px"}} />

      <Button
        text={t("contractor.home.onboarding.stepper.btns.next")}
        type={"primary"}
        onClick={() => props.goNext({pass: file})}
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          width: "240px"
        }}
        disabled={!file.length}
      />
    </div>
  );
}

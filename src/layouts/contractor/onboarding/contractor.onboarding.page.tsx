import React, {useState} from "react";
import "./styles.css";
import { Steps } from "antd";
import { UserOutlined, HomeOutlined, SolutionOutlined, SafetyOutlined } from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import ContractorOnboardingInfoStep from "./steps/contractor.onboarding.info.step";
import ContractorOnboardingAddressStep from "./steps/contractor.onboarding.address.step";
import ContractorOnboardingDescriptionStep from "./steps/contractor.onboarding.descriptions.step";
import ContractorOnboardingVerificationStep from "./steps/contractor.onboarding.verification.step";

const { Step } = Steps;

export default function ContractorOnboardingPage() {
  window.onbeforeunload = function () {
    return "Are you really want to perform the action?";
  };

  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    info: {
      firstName: "",
      lastName: "",
      sex: "",
      birth: ""
    },
    address: {
      country: "",
      city: "",
      postalCode: "",
      address: ""
    },
    description: {
      description: "",
      certificates: [""],
      images: [""]
    },
    pass: ""
  });

  const getCurrentComponent = () => {
    switch (currentStep) {
    case 0:
      return <ContractorOnboardingInfoStep data={data.info} />;
    case 1:
      return <ContractorOnboardingAddressStep />;
    case 2:
      return <ContractorOnboardingDescriptionStep />;
    case 3:
      return <ContractorOnboardingVerificationStep />;
    }
  };

  return(
    <div>
      <Steps current={currentStep} onChange={(value:number) => setCurrentStep(value)}>
        <Step
          title={t("contractor.home.onboarding.stepper.info.title")}
          icon={<UserOutlined />}
        />
        <Step
          title={t("contractor.home.onboarding.stepper.address")}
          icon={<HomeOutlined />}
        />
        <Step
          title={t("contractor.home.onboarding.stepper.description")}
          icon={<SolutionOutlined />}
        />
        <Step
          title={t("contractor.home.onboarding.stepper.verification")}
          icon={<SafetyOutlined />}
        />
      </Steps>
      <div className="contractor_onboarding_stepper_box">
        {getCurrentComponent()}
      </div>
    </div>
  );
}

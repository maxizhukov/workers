import React, {useEffect, useState} from "react";
import "./styles.css";
import { Steps } from "antd";
import { UserOutlined, HomeOutlined, SolutionOutlined, SafetyOutlined } from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import ContractorOnboardingInfoStep from "./steps/contractor.onboarding.info.step";
import ContractorOnboardingAddressStep from "./steps/contractor.onboarding.address.step";
import ContractorOnboardingDescriptionStep from "./steps/contractor.onboarding.descriptions.step";
import ContractorOnboardingVerificationStep from "./steps/contractor.onboarding.verification.step";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/animations/72769-checking-mails.json";
import {RootState} from "../../../redux/reducers/rootReducer";
import {connect} from "react-redux";
import {contractorOnboardingEnum} from "../../../enums/contractor.enum";
import {requestHandler} from "../../../utils/requestHandler";
import {apiErrorHandler} from "../../../utils/apiErrorHandler";

const { Step } = Steps;

interface IProps {
	user?: any;
}

function ContractorOnboardingPage(props:IProps) {
  window.onbeforeunload = function () {
    return "Are you really want to perform the action?";
  };
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [showProcessingScreen, setShowProcessingScreen] = useState(false);

  useEffect(() => {
	  if (props.user.userInformation &&
		  props.user.userInformation.approvedStatus &&
		  props.user.userInformation.approvedStatus &&
		  props.user.userInformation.approvedStatus === contractorOnboardingEnum.pending
	  ) {
	  	setShowProcessingScreen(true);
	  }
  }, [props.user]);

  const [data, setData] = useState<any>({
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
    pass: {
      pass: ""
    }
  });

  const goNext = async (key: string, values: any) => {
	  const updatedData = {...data, [key]: values};
	  setData(updatedData);
	  if (currentStep !== 3) {
		  setCurrentStep(currentStep + 1);
	  } else {
		  data.pass = values;
		  await requestHandler({
			  path: "contractor/onboarding",
			  method: "POST",
			  data: data,
			  showErrorNotification: true,
			  tokenType: "contractor"
		  }).then((res:any) => {
			  if (res && res.status) {
				  setShowProcessingScreen(true);
			  }
		  }).catch((e:any) => {
			  return apiErrorHandler(500, e);
		  });
	  }
  };

  const getCurrentComponent = () => {
    switch (currentStep) {
    case 0:
      return <ContractorOnboardingInfoStep
        data={data.info}
        goNext={(values:any) => goNext("info", values)}
      />;
    case 1:
      return <ContractorOnboardingAddressStep
        data={data.address}
        goNext={(values:any) => goNext("address", values)}
      />;
    case 2:
      return <ContractorOnboardingDescriptionStep
        data={data.description}
        goNext={(values:any) => goNext("description", values)}
      />;
    case 3:
      return <ContractorOnboardingVerificationStep
        data={data.pass}
        goNext={(values:any) => goNext("pass", values)}
      />;
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <div>
      {showProcessingScreen
        ? <div className="onboarding_processing_box">
			  <h3>{t("contractor.home.onboarding.stepper.processing.title")}</h3>
			  <p>{t("contractor.home.onboarding.stepper.processing.text")}</p>
          <Lottie options={lottieOptions} width={"60%"}/>
        </div>
        : <>
          <Steps
            current={currentStep}
            onChange={(value:number) => setCurrentStep(value)}
          >
            <Step
              title={t("contractor.home.onboarding.stepper.info.title")}
              icon={<UserOutlined />}
            />
            <Step
              disabled={currentStep < 1}
              title={t("contractor.home.onboarding.stepper.address")}
              icon={<HomeOutlined />}
            />
            <Step
              disabled={currentStep < 2}
              title={t("contractor.home.onboarding.stepper.description.title")}
              icon={<SolutionOutlined />}
            />
            <Step
              disabled={currentStep < 3}
              title={t("contractor.home.onboarding.stepper.verification")}
              icon={<SafetyOutlined />}
            />
          </Steps>
          <div className="contractor_onboarding_stepper_box">
            {getCurrentComponent()}
          </div>
        </>
      }
    </div>
  );
}

const mapStateToProps = (state:RootState) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(ContractorOnboardingPage);

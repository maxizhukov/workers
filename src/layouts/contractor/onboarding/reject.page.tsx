import React, {useEffect, useState} from "react";
import "./styles.css";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/animations/86839-wrong.json";
import {requestHandler} from "../../../utils/requestHandler";
import {useTranslation} from "react-i18next";
import Button from "../../../components/Button/Button";
import {Link} from "react-router-dom";

interface IProps {
	user?: any
}

export default function ContractorOnboardingRejectPage(props:IProps) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const getRejectData = async () => {
	  await requestHandler({
		  path: "contractor/onboarding/reject",
		  method: "GET",
		  tokenType: "contractor",
		  showErrorNotification: true
	  }).then((res:any) => {
	  	setData(res.data);
	  	setLoading(false);
	  }).catch((e) => {
		  console.log(e);
	  });
  };

  useEffect(() => {
  	getRejectData();
  }, []);

  console.log(data);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <>
      {loading
        ? <p>Loading...</p>
        : <div className="contractor_oboarding_reject_box">
			  <Lottie options={lottieOptions} width={"200px"}/>
			  <h2>{t("contractor.home.onboarding.reject.title")}</h2>
			  <h4>{t("contractor.home.onboarding.reject.text")}</h4>
			  <div className="contractor_oboarding_reject_desc">
				  <h3>{t("contractor.home.onboarding.reject.reason")}</h3>
				  <p>{data.title}</p>
				  <h3>{t("contractor.home.onboarding.reject.description")}</h3>
				  <p>{data.description}</p>
				  <Link to={data.requestId}>
					  <Button
						  type="primary"
						  text={t("contractor.home.onboarding.reject.btn")}
					  />
				  </Link>
			  </div>
		  </div>
      }
    </>
  );
}

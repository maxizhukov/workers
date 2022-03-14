import React from "react";
import { Routes, Route } from "react-router-dom";
import ContractorOnboardingPage from "./contractor.onboarding.page";

export default function ContractorOnboardingRouter() {
  return(
	  <Routes>
		  <Route path="/" element={<ContractorOnboardingPage />} />
	  </Routes>
  );
}

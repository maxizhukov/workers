import React from "react";
import { Routes, Route} from "react-router-dom";
// eslint-disable-next-line max-len
import ContractorAuthRouter from "./authentication/contractor.auth.router";
import ContractorHomeRouter from "./home/home.router";

export default function ContractorRouter() {
  return(
    <main>
      <Routes>
        <Route path="/auth/*" element={<ContractorAuthRouter />} />
        <Route path="/*" element={<ContractorHomeRouter />} />
      </Routes>
    </main>
  );
}

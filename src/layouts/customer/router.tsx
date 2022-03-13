import React from "react";
import { Routes, Route} from "react-router-dom";
import CustomerAuthRouter from "./routers/AuthRouter";
import CustomerHomeRouter from "./routers/CustomerHomeRouter";

export default function CustomerRouter() {
  return(
    <main>
      <Routes>
        <Route path="/auth/*" element={<CustomerAuthRouter />} />
        <Route path="/*" element={<CustomerHomeRouter />} />
      </Routes>
    </main>
  );
}

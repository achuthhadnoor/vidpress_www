import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import License from "./License";
import Main from "./Main";
const IndexPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<License />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default IndexPage;

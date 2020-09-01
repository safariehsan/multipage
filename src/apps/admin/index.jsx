import React from "react";
import ReactDOM from "react-dom";
import { Header, Footer } from "components";
import { CustomField } from "./components";
import { ApplicationAside } from "./components";
import "../../styles/pages/admin.scss";

ReactDOM.render(
  <>
    <Header />
    <CustomField />
    <ApplicationAside />
    <Footer />
  </>,
  document.getElementById("header")
);

import React from "react";
import Filters from "../../components/filters/filters.component";
import Classlist from "../../components/classlist/classlist.component";

const RegistrationPage = () => {
  return (
    <div className="registration-container">
      <div className="filter-container">
        <Filters></Filters>
      </div>
      <div className="classlist-container">
        <Classlist></Classlist>
      </div>
    </div>
  );
};

export default RegistrationPage;

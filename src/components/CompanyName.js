import React from "react";

const CompanyName = ({ logo, company, symbol }) => {
  if (company == null) return null;
  else {
    return (
      <h1>
        <img src={logo} width="30" height="30" alt="error" />
        &ensp;
        {company}
        <div fontsize="5">({symbol})</div>
      </h1>
    );
  }
};

export default CompanyName;

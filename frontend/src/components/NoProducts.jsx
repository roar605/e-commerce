import React from "react";
import "../Styles/componentStyles/NoProducts.css";

function NoProducts({ keyword }) {
  return (
    <div className="no-products-content">
      <div className="no-products-icon">⚠️</div>
      <h3 className="no-products-title">No Product Found</h3>
      <p className="no-products-message">
        No products are currently available matching {`${keyword}`} search
        results
      </p>
    </div>
  );
}

export default NoProducts;

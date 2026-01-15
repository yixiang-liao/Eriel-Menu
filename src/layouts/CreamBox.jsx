import React from "react";
import { useNavigate } from "react-router-dom";

const CreamBox = ({ id, name, cover1, cover2 }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cream-box"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/inner/${id}`)} // HashRouter => /#/inner-{id}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/inner/${id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="image-container">
        <img src={cover1} alt={name} />
        {cover2 ? <img src={cover2} alt={`${name} hover`} className="img-hover" /> : null}
      </div>
      <p className="name">{name}</p>
    </div>
  );
};

export default CreamBox;

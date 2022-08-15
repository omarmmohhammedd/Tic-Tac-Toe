import React from "react";
import "../App.css";
const Square = (props) => {
  return (
    <div
      className='square'
      onClick={props.chooseSquare}
      style={props.val === "X" ? { color: "#e27035" } : { color: "#bed753" }}>
      {props.val}
    </div>
  );
};

export default Square;

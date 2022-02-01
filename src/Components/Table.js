import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "../App.css";

const Table = (props) => {
  const { headers, rows } = props;
  return (
    <div className="table-wrapper">
      <table className="table table-bordered table-hover">
        <TableHeader headers={headers}></TableHeader>
        <TableBody headers={headers} rows={rows}></TableBody>
      </table>
    </div>
  );
};

export default Table;

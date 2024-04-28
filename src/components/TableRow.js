import React from "react";
import "../css/Table.css";
const TableRow = ({ data }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.rank}</td>
      <td>{data.price_usd}</td>
      <td>{data.percent_change_24h}</td>
      <td>{data.price_btc}</td>
      <td>{data.market_cap_usd}</td>
    </tr>
  );
};

export default TableRow;

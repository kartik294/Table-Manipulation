import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import "../css/Table.css";
import { RiSearchLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { FaArrowDownLong } from "react-icons/fa6";

const Table = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    axios
      .get("https://api.coinlore.net/api/tickers/")
      .then((res) => {
        setCryptoData(res.data.data);
      })
      .catch((err) => console.error("Error fetching crypto data:", err));
  }, []);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedData = cryptoData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
    } else {
      return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm.toLowerCase()) // Convert ID to string for comparison
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <div className="header-container">
        <div className="headline">Headline</div>
        <div className="input-and-icons">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <RiSearchLine className="search-icon" />
          </div>
          <div className="delete-icon">
            <RiDeleteBin6Line />
            <span>Delete</span>
          </div>
          <div className="filter-icon">
            <IoFilterSharp />
            <span>Filter</span>
          </div>
          <div className="export-icon">
            <PiExportBold />
            <span>Export</span>
          </div>
          <div className="add-new">
            <div className="add-box">
              <IoIosAdd className="add-icon" />
            </div>
            <span>Add New CTA</span>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("name")}>
              Name <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("rank")}>
              Rank <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("price_usd")}>
              Price (USD) <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("percent_change_24h")}>
              Percent Change (24h) <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("price_btc")}>
              Price (BTC) <FaArrowDownLong />
            </th>
            <th onClick={() => handleSort("market_cap_usd")}>
              Market Cap (USD) <FaArrowDownLong />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

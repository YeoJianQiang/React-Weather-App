import React from "react";
import "./HistoryList.css";
import {BsFillTrashFill} from "react-icons/bs";
import {AiOutlineSearch} from "react-icons/ai";

function HistoryList({ history, deleteHistoryItem, searchFromHistory }) {
  return (
    <div className="history">
      <ul>
        {history.map((item, index) => (
          <li key={index} className="list-item">
            <div className="left">
              <div className="top">
                <div className="name">{item.name}</div>
                <div className="country">{item.country}</div>
              </div>
              <div className="bottom">
                <div className="time">{item.time}</div>
              </div>
            </div>
            <div className="right">
            <button
                onClick={() => searchFromHistory(item.name)}
                className="icon-button"
              >
                <AiOutlineSearch className="icon" />
              </button>
              <button
                onClick={() => deleteHistoryItem(index)}
                className="icon-button"
              >
                <BsFillTrashFill className="icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;

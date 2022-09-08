import React, { useState } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import "./App.css";
const Home = () => {
  const [data, setdata] = useState({ con: "" });
  const [ide, setide] = useState(0);
  const [search, setsearch] = useState();
  const [valu, setval] = useState("");
  const setvalue = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };
  const generateid = () => {
    if (data.con) {
      let val = Math.floor(1000 + Math.random() * 9000);
      setide(val);
      console.log(data);
      axios.post(`http://localhost:3001/send/${val}`, data).then((res) => {
        console.log(res);
      });
      setdata({ con: "", id: "" });
    }
  };
  const fetchid = () => {
    axios.get(`http://localhost:3001/${search}`, data).then((res) => {
      console.log(res.data.content);
      setval(res.data.content);
      setsearch("");
    });
  };
  const tocopy = () => {
    copy(valu);
  };
  return (
    <>
      <div className="container">
        <div className="contenttosend">
          <div className="con">
            <textarea
              name="con"
              id=""
              value={data.con}
              cols="30"
              rows="10"
              placeholder="place your content here"
              onChange={setvalue}
            ></textarea>
          </div>
          <div className="btnsend">
            <button className="send" onClick={generateid}>
              Send
            </button>
            Your code To retrive : {ide != 0 ? ide : ""}
          </div>
        </div>
        <div className="contenttoretrive">
          <div className="btnandtext">
            <input
              type="text"
              value={search}
              placeholder="your retrive code here"
              onChange={(e) => setsearch(e.target.value)}
            />
            <button className="fetch" onClick={fetchid}>
              Fetch
            </button>
            <button className="cpybtn" onClick={tocopy}>
              {" "}
              &#128203;{" "}
            </button>
          </div>
          <div className="text">
            <textarea value={valu} id="" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

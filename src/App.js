import './App.css';
import React, { useState, useEffect } from 'react';
import Table from './Components/Table';
import Chart from './Components/Chart';

function App() {
  //Declaring States
  const [data,setData]=useState([]);
	const [head,setHead]=useState([]);
  const [query, setQuery] =useState(0);
  const [label,setLabel]=useState([]);
  const [value,setValue]=useState([]);
  const [tag,setTag]=useState("Total Sales");
  const [heading,setHeading]=useState("");
  const [Dheading, setDHeading] = useState("");
  const [DLabel,setDLabel]=useState([]);
  const [DValue,setDValue]=useState([]);

  //Fetching Data from API
  useEffect(()=>{
    fetch(`http://localhost:5000/query?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let testing='testing daa';
        let lab=[]
        let val=[]
        let dummy = [];
        setData(result);
        setHead(Object.keys(result[0]));
        switch(query){
          case 1:
            clearStates();
            result.forEach((item) => {
              dummy[item.Year] = dummy[item.Year]
                ? dummy[item.Year] + item.Total_Sales
                : item.Total_Sales;
            });
            setHeading("Sum of Total Sales of Every Year")
            setLabel(Object.keys(dummy));
            setValue(Object.values(dummy))
            break;
          case 2:
            clearStates();
            result.map((e) => {
              val.push(e.Total_Sales);
              lab.push(e.state);
            });
            setHeading("Total Sales of Every State");
            setLabel(lab);
            setValue(val);
            break;
          case 3:
            let DVal=[]
            let Dlab=[]
            clearStates();
            result.forEach((item) => {
              if(item.type === "Analog"){
                val.push(item.Total_Sales);
                lab.push(item.brand)
              }
              else if(item.type="Digital"){
                DVal.push(item.Total_Sales);
                Dlab.push(item.brand);
              }
            });
            setHeading("Total Sales of Analog Brand");
            setLabel(lab);
            setValue(val);
            setDHeading("Total Sales of Digital Brand");
            setDLabel(Dlab);
            setDValue(DVal);
            break;
          case 4:
            clearStates();
            result.forEach((item) => {
              dummy[item.Month] = dummy[item.Month]
                ? dummy[item.Month] + item.Total_Sales
                : item.Total_Sales;
            });
            setHeading("Sum of Total Sales of Every Month");
            setLabel(Object.keys(dummy));
            setValue(Object.values(dummy));
            break;
          case 5:
            clearStates();
            result.map((e) => {
              val.push(e.Total_Sales);
              lab.push(e.Item_Name);
            });
            setHeading("Total Sales of Every Item");
            setLabel(lab);
            setValue(val);
            break;
          case 6:
            clearStates();
            result.map((e)=>{
              console.log(e.Street+" "+e.Total_Sales);
              val.push(e.Total_Sales);
              lab.push(e.Street);
            })
            setHeading("Total Sales of Every Street");
            setLabel(lab);
            setValue(val);
            break
          default:
            clearStates();
            result.forEach((item) => {
              dummy[item.Year] = dummy[item.Year]
                ? dummy[item.Year] + item.Total_Sales
                : item.Total_Sales;
            });
            setLabel(Object.keys(dummy));
            setValue(Object.values(dummy))
            break;
        }
      })
      .catch((err) =>{
        console.log("err", err);
      })
  },[query])
  const clearStates=()=>{
    setHeading("");
    setLabel([]);
    setValue([]);
    setDHeading("");
    setDLabel([]);
    setDValue([]);
  }
  return (
    <div>
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(1)}
              >
                Query 1
              </a>
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(2)}
              >
                Query 2
              </a>
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(3)}
              >
                Query 3
              </a>
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(4)}
              >
                Query 4
              </a>
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(5)}
              >
                Query 5
              </a>
              <a
                className="nav-item nav-link"
                href="#"
                onClick={() => setQuery(6)}
              >
                Query 6
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="row pb-2 mb-3">
        <div
          className="col-md-12 mt-2"
          style={{ borderBottom: "1px solid black" }}
        >
          <div className="row">
            <div className="col">
              <Table headers={head} rows={data} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <h1>Graph</h1>
      </div>
      <div className="row mt-4">
        <div
          className="col-md-12 mt-2 pt-2 pb-2"
          style={{ borderTop: "1px solid black" }}
        >
          <div className="mt-7">
            {label.length > 0 && value.length > 0 ? (
              <Chart tag={tag} heading={heading} label={label} value={value} />
            ) : (
              <div>Chart</div>
            )}
          </div>
        </div>

        {DLabel.length > 0 && DValue.length > 0 ? (
          <div
            className="col-md-12 mt-2 pt-2 pb-2"
            style={{ borderTop: "1px solid black" }}
          >
            <div className="mt-10">
              <Chart
                tag={tag}
                heading={Dheading}
                label={DLabel}
                value={DValue}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="row mb-2" style={{ justifyContent: "center" }}>
        <span style={{fontSize:16,fontWeight:"bold"}}>&copy; Haseeb Ali Sajid & Kashif Usman</span>
      </div>
    </div>
  );
}
export default App;

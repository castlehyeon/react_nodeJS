import React, { useState } from "react";

function App() {
  const [accumulatedSum, setAccumulatedSum] = useState(0);
  const [progress, setProgress] = useState("시작 전");
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    console.log("======start=======");
    setProgress("진행 중...");
    setIsRunning(true);
    console.log(sessionStorage.getItem("loop"));

    fetch("http://localhost:8000/getSum")
      .then((response) => response.json())
      .then((data) => {
        setProgress("요청 완료!");
        setAccumulatedSum(data.result);
        setIsRunning(false);
      })
      .catch((error) => {
        console.error(error);
        setIsRunning(false);
      });
  };

  const handleCancel = () => {
    console.log("======cancel=======");
    setProgress("요청 취소");
    setIsRunning(false);

    fetch("http://localhost:8000/getSumCancel")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          setAccumulatedSum(data.result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInit = () => {
    console.log("======Init======");

    fetch("http://localhost:8000/getSumInit")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          setProgress("초기화 완료!");
          setAccumulatedSum(data.result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>합: {accumulatedSum}</h1>
      <h1>상태: {progress}</h1>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleCancel} disabled={!isRunning}>
        Cancel
      </button>
      <button onClick={handleInit} disabled={isRunning}>
        Init
      </button>
    </div>
  );
}

export default App;

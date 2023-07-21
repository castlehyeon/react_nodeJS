import React from "react";

const TimeOut = () => {
  var sessionData = { time: 0 };

  sessionStorage.setItem("mineSession", sessionData);

  const handlerRequest = () => {};

  const handlerCancel = () => {};

  return (
    <div>
      <button onClick={handlerRequest}>요청</button>
      <button onClick={handlerCancel}>취소</button>
    </div>
  );
};

export default TimeOut;

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "mySession",
    resave: false,
    saveUninitialized: true,
  })
);

let sum = 0;
let num = 1;
let testcase = 0;

app.get("/getSum", (req, res) => {
  let interval;
  // interval 변수를 /getSum 요청 범위 밖에서 선언해서
  // 취소, 초기화 때도 관리할 수 있게하기.

  const loop = true;

  const startSum = () => {
    interval = setInterval(() => {
      try {
        sum += num;
        num++;
        testcase++;
        req.session.loop = loop;

        if (testcase >= 1000 || !req.session.loop) {
          // 종료
          num = 1;
          testcase = 0;
          clearInterval(interval);
          res.json({ result: sum, status: !req.session.loop ? -2 : 1 }); // 결과 반환
          sum = 0;
        }
      } catch (e) {
        res.json({ result: sum, status: -1 });
      }
    }, 10);
  };

  startSum();

  app.get("/getSumCancel", (req, res) => {
    try {
      req.session.loop = false;
      clearInterval(interval);
      res.json({ result: sum, status: 1 });
    } catch (e) {
      res.json({ status: -1 });
    }
  });

  app.get("/getSumInit", (req, res) => {
    try {
      sum = 0;
      num = 1;
      testcase = 0;
      req.session.loop = false;
      clearInterval(interval); // 초기화 때도 루프 중지하기.
      res.json({ result: sum, status: 1 });
    } catch (e) {
      res.json({ status: -1 });
    }
  });
});

app.listen(8000, () => {
  console.log("서버 통신중");
});

import express from "express";
import cors from "cors";
import collect from "./api/collect.js";
import upload from "./api/upload.js";
import all from "./api/all.js";

const app = express();
app.use(cors());
app.use(express.json());

// 각 엔드포인트 라우팅
app.post("/collect", collect);
app.post("/upload", upload);
app.post("/all", all);

app.listen(7777, () => {
  console.log("🟢 리뷰 API 서버 실행 중 → http://localhost:7777");
});

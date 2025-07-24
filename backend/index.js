import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const merchant_id = "1231334";
const merchant_secret = "MTExNTc2MTE4MTE0MDY0NzE2MDIyNjg3Mzg4MjQwMjU1ODI1NDU0NA==";


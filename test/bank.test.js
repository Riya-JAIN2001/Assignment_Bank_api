const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Bank = require("../models/bankSchema");

const app = express();
app.use(express.json());
const bankRoutes = require("../routes/bank");
app.use("/api/banks", bankRoutes);

beforeAll(async () => {
  const url = `mongodb+srv://niajp2950:admin123@cluster0.iq4ers6.mongodb.net/Assinment`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("GET /api/banks", () => {
  it("should get all banks", async () => {
    const bank = new Bank({ name: "Test Bank", branches: [{ branchName: "Main", address: "123 Street", ifsc: "TEST123" }] });
    await bank.save();
    const res = await request(app).get("/api/banks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1); // Modified to ensure the correct length
    expect(res.body.some(b => b.name === "Test Bank")).toBeTruthy(); // Ensure the specific bank is in the response
  });
});

describe("GET /api/banks/:bankName/branches/:branchName", () => {
  it("should get a specific branch of a bank", async () => {
    const bank = new Bank({
      name: "Test Bank",
      branches: [
        { branchName: "Main", address: "123 Street", city:"bhopal", district:"Bopal",bankName:"sbi", ifsc: "TEST123" },
      ],
    });
    await bank.save();
    const res = await request(app).get("/api/banks/Test Bank/branches/Main");
    expect(res.statusCode).toEqual(200);
    expect(res.body.branchName).toEqual("Main");
    expect(res.body.address).toEqual("123 Street");
    expect(res.body.ifsc).toEqual("TEST123");
  });
});

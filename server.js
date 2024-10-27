const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const orders = [
  {
    id: 1,
    uid: "qwe",
    items: [
      {
        name: "Tushar",
        single_price: "50",
        currency: "USD",
        count: "2",
      },
    ],
  },
  {
    id: 2,
    uid: "xyz",
    items: [
      {
        name: "Sneha",
        single_price: "500",
        currency: "INR",
        count: "4",
      },
    ],
  },
];

const users = [
  {
    uid: "wer",
    pwd: "ert1",
  },
  {
    uid: "jpe",
    pwd: "ert2",
  },
];
app.get("/orders", (request, response) => {
  response.json(orders);
});

app.get("/users", (request, response) => {
  console.log(users);
  response.json(users);
});

app.post("/users", async (request, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashpwd = await bcrypt.hash(request.body.pwd, salt);

    const user = { uid: request.body.uid, pwd: hashpwd };
    users.push(user);
    response.status(201).send();
  } catch {
    response.status(500).send();
  }
});

app.listen(3000);

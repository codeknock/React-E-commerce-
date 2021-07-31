const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JIeS4ESq2PYySOPMDuwM0P1pXS9j6vSE0kNCzDFF9uAMJWSWOhSAUM476TUDJf6jTcT1vNj8rqtOo5JhDV4Et1R00Jc2pj1jO"
);
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to shop online");
});
app.post("/checkout", async (req, res) => {
  let error;
  let status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "all products description",
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key: key,
      }
    );
    status = "success";
  } catch (error) {
    console.log(error);
    status = "error";
  }
  res.json({ status });
});
app.listen(8080, () => {
  console.log("app running on port 8080");
});

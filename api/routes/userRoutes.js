const express = require("express");
const db = require("../db");
const utils = require("../utils");
const cryptoJs = require("crypto-js");

const router = express.Router();

router.post("/signup", (request, response) => {
  // const firstName = request.body.firstName
  // const lastName = request.body.lastName
  // const email = request.body.email
  // const password = request.body.password

  // extract the properties of request.body (json) to
  // const separate variables
  const { firstName, password, lastName, email } = request.body;

  const connection = db.openConnection();

  // check if the email sent by user already exists in the table
  const emailStatement = `select email from user where email = '${email}'`;
  connection.query(emailStatement, (error, emails) => {
    if (error) {
      // if error is generated while executing the query
      response.send(utils.createResult(error));
    } else {
      if (emails.length == 0) {
        // encrypt the password
        const encryptedPassword = cryptoJs.SHA512(password);

        // there is no user registered with this email
        const statement = `
          insert into user
            (firstName, lastName, email, password)
          values
            ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}')
        `;
        connection.query(statement, (error, result) => {
          connection.end();
          response.send(utils.createResult(error, result));
        });
      } else {
        // at least one user exists with this email address
        connection.end();
        response.send(
          utils.createResult("email address already exists, please use another")
        );
      }
    }
  });
});

router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  const connection = db.openConnection();
  const encryptedPassword = cryptoJs.SHA512(password);
  const statement = `select id, firstName, lastName from user where email = '${email}' and password = '${encryptedPassword}'`;
  connection.query(statement, (error, users) => {
    connection.end();
    if (error) {
      response.send(utils.createResult(error));
    } else if (users.length == 0) {
      response.send(utils.createResult("user not found"));
    } else {
      const user = users[0];
      response.send(utils.createResult(null, user));
    }
  });
});

router.put("/profile/:id", (request, response) => {
  const { id } = request.params;
  const {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    gender,
    phone,
    birthDate,
  } = request.body;

  const statement = `
    update user
    set
      firstName = '${firstName}',
      lastName = '${lastName}',
      addressLine1 = '${addressLine1}',
      addressLine2 = '${addressLine2}',
      city = '${city}',
      state = '${state}',
      country = '${country}',
      postalCode = '${postalCode}',
      gender = '${gender}',
      phone = '${phone}',
      birthDate = '${birthDate}'
    where
      id = ${id}
  `;
  const connection = db.openConnection();
  connection.query(statement, (error, result) => {
    connection.end();
    response.send(utils.createResult(error, result));
  });
});

router.get("/profile/:id", (request, response) => {
  const { id } = request.params;
  const statement = `
    select
      id,
      email,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      gender,
      phone,
      birthDate
    from user
    where id = ${id}
  `;
  const connection = db.openConnection();
  connection.query(statement, (error, records) => {
    connection.end();
    if (records.length > 0) {
      response.send(utils.createResult(error, records[0]));
    } else {
      response.send(utils.createResult("user does not exist"));
    }
  });
});

module.exports = router;

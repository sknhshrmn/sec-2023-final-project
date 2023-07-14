import request from "supertest";
import app from "../../../app";

//  Case 1: Empty fields
describe("Try login with all empty fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/login")
      .send({
        identifier: "",
        password: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try login with empty identifier field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/login")
      .send({
        username: "",
        password: "12679dfd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try login with empty password field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/login")
      .send({
        username: "sarahhatim",
        password: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 2: Invalid email / username
describe("Try login using invalid email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sarah,,.hatim",
        password: "12679dfd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try login using invalid username", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sartge",
        password: "12679dfd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 3: Invalid credential
describe("Try login using invalid password", () => {
  test("It should return status code 403 and return message Login unsuccessful", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sarahhatim",
        password: "12679dfaaded",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Login unsuccessful",
            data: "Invalid credential",
          })
        );
      });
  });
});

// Case 4: Correct inputs
describe("Try login using correct username and password", () => {
  test("It should return status code 200 and return message, user data, and token", async () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "sarah_hatim",
        password: "12679dfd",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Logged in successfully",
            userData: expect.any(Object),
            access_token: expect.any(String),
          })
        );
      });
  });
});

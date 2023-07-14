import request from "supertest";
import app from "../../../app";

//  Case 1: Empty fields
describe("Try register with all empty fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/register")
      .send({
        username: "",
        email: "",
        password: "",
        fullname: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with empty username field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/register")
      .send({
        username: "",
        email: "sarah@gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with empty email field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/register")
      .send({
        username: "sarahhatim",
        email: "",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with empty password field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/register")
      .send({
        username: "sarahhatim",
        email: "sarah@gmail.com",
        password: "",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with empty fullname field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/register")
      .send({
        username: "sarahhatim",
        email: "sarah@gmail.com",
        password: "12679dfd",
        fullname: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 2: Not enough character for field
describe("Try register with less than 4 characters in username field", () => {
  test("It should return status code 403 and return message = Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sar",
        email: "sarah@gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with less than 8 characters in password field", () => {
  test("It should return status code 403 and return message = Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sar",
        email: "sarah@gmail.com",
        password: "12679d",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try register with less than 4 characters in fullname field", () => {
  test("It should return status code 403 and return message = Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sar",
        email: "sarah@gmail.com",
        password: "12679dfd",
        fullname: "Srh",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 3: Invalid email
describe("Try register using invalid email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sar",
        email: "sarah.gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

// Case 4: Correct inputs
describe("Try register using correct username, email, password, and fullname", () => {
  test("It should return status code 200 and return message, user data, and token", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sarah_hatim23",
        email: "sarah_hati342m@gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "A user created succesfully",
            userData: expect.any(Object),
            access_token: expect.any(String),
          })
        );
      });
  });
});

// Case 5: Username / Email already exists
describe("Try register using existing registered username", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "fitri_yahaya",
        email: "sarah@gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            message: "Username already exists.",
          })
        );
      });
  });
});

describe("Try register using existing registered email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "sarahhatim4380",
        email: "fitri_yahaya@gmail.com",
        password: "12679dfd",
        fullname: "Sarah Hatim",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            message: "Email already exists.",
          })
        );
      });
  });
});

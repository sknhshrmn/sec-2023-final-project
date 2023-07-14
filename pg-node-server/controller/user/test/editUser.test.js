import request from "supertest";
import app from "../../../app";

const id = 8;
// Renew token everytime want to test (user with admin role)
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2ODkxOTMyMzMsImV4cCI6MTY4OTE5NjgzM30.CKFm2Yp7rrwDYt8t1G4TwzbkRhT7WXw6C0PMfdQwuHM";

//  Case 1: Empty fields
describe("Try edit user with all empty fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "",
        email: "",
        fullname: "",
        is_admin: null,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit user with empty username field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "",
        email: "fitri_yahaya@gmail.com",
        fullname: "Fitri Yahaay",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit user with empty email field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "",
        fullname: "Fitri Yahaay",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit user with empty fullname field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya@gmail.com",
        fullname: "",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit user with empty admin status field", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya@gmail.com",
        fullname: "",
        is_admin: null,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 2: Not enough character for field
describe("Try edit user with less than 4 characters in username field", () => {
  test("It should return status code 403 and return message = Invalid Request", async () => {
    return request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fit",
        email: "fitri_yahaya@gmail.com",
        fullname: "Fitri YAhaya",
        is_admin: null,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit user with less than 4 characters in fullname field", () => {
  test("It should return status code 403 and return message = Invalid Request", async () => {
    return request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya@gmail.com",
        fullname: "Fit",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 3: Invalid email
describe("Try edit user using invalid email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya2gmail.com",
        fullname: "Fitri YAhaya",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 3: Invalid type for boolean (admin status)
describe("Try edit user using invalid type for is_admin", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya2gmail.com",
        fullname: "Fitri YAhaya",
        is_admin: "true",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

// Case 5: Correct inputs
describe("Try edit user using correct username, email, password, and fullname", () => {
  test("It should return status code 200 and return message, user data, and token", async () => {
    return request(app)
      .put("/api/users/" + id + "/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "fitri_yahaya@gmail.com",
        fullname: "Fitri Yahaya",
        is_admin: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User updated successfully");
        expect(response.body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
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

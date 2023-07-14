import request from "supertest";
import app from "../../../app";

// CANNOT TEST THIS BECAUSE THIS CONTROLER USING req.user, WHICH IS VARIABLE FROM SERVER SIDE

const userData = {
  id: 10,
  username: "sknhshrmn",
  email: null,
  password: "$2a$10$mAO77tMUPW/exAHGve1G5u/r0FYMWwGc12ndAEooJvH/tJoMrGLRC",
  is_admin: false,
  created_at: "2023-07-06T18:31:10.248Z",
  deleted_at: "2023-07-10T15:49:17.572Z",
  fullname: null,
  photo: null,
};

// Renew token everytime want to test
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2ODkxOTMyMzMsImV4cCI6MTY4OTE5NjgzM30.CKFm2Yp7rrwDYt8t1G4TwzbkRhT7WXw6C0PMfdQwuHM";

//  Case 1: Empty fields
describe("Try update account with all empty fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "",
        email: "",
        fullname: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try update account with all username fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "",
        email: "akinkay9@gmail.com",
        fullname: "Siti Nursakinah Shahriman",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try update account with all email fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "sakinah_shahriman",
        email: "",
        fullname: "Siti Nursakinah Shahriman",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try update account with all full name fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "sakinah_shahriman",
        email: "akinkay9@gmail.com",
        fullname: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

//   Case 2: Invalid email
describe("Try update account using invalid email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "sakinah_shahriman",
        email: "sadfsdr67,ol",
        fullname: "Siti Nursakinah Shahriman",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

// Case 4: Correct inputs
describe("Try update account using correct username and password", () => {
  test("It should return status code 200 and return message, user data, and token", async () => {
    return request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "sakinah_shahriman",
        email: "akinkay9@gmail.com",
        fullname: "Siti Nursakinah Shahriman",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Account updated successfully",
            userData: expect.any(Object),
            access_token: expect.any(String),
          })
        );
      });
  });
});

// Case 5: Username / Email already exists
describe("Try update username using existing registered username", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "fitri_yahaya",
        email: "akinkay9@gmail.com",
        fullname: "Siti Nursakinah Shahriman",
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

describe("Try update email using existing registered email", () => {
  test("It should return status code 403 and return message Invalid Request", async () => {
    return request(app)
      .post("/api/my-account/edit")
      .set("Authorization", token)
      .send({
        username: "sakinah_shahriman",
        email: "fitri_yahaya@gmail.com",
        fullname: "Siti Nursakinah Shahriman",
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

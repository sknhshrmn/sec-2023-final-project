import request from "supertest";
import app from "../../../app";

// Renew token everytime want to test
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2ODkxOTMyMzMsImV4cCI6MTY4OTE5NjgzM30.CKFm2Yp7rrwDYt8t1G4TwzbkRhT7WXw6C0PMfdQwuHM";

describe("Try logout", () => {
  test("It should return status code 200 and return message = You have been logged out", () => {
    request(app)
      .delete("/api/logout")
      .set("Authorization", token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("You have been logged out");
      });
  });
});

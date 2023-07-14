import request from "supertest";
import app from "../../../app";

const id = 8;
// Renew token everytime want to test (user with admin role)
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2ODkxOTMyMzMsImV4cCI6MTY4OTE5NjgzM30.CKFm2Yp7rrwDYt8t1G4TwzbkRhT7WXw6C0PMfdQwuHM";

describe("Try delete user by id", () => {
  test("It should return status code 200 and return message = User is deleted succesfully!", () => {
    request(app)
      .delete("/api/customers/" + id + "/delete")
      .set("Authorization", token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "User is deleted succesfully!",
            user: expect.any(Object),
          })
        );
      });
  });
});

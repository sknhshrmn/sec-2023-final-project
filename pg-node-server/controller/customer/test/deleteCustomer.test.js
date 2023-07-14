import request from "supertest";
import app from "../../../app";

const id = 19;
// Renew token everytime want to test
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNjg5MTkwNzIxLCJleHAiOjE2ODkxOTQzMjF9.sxZjtvFdU-NIzUNV9rTTTU8oxlkj0xd2vU_-Bs19eRE";

describe("Try delete customers by id", () => {
  test("It should return status code 200 and return message = Customer is deleted succesfully!", () => {
    request(app)
      .delete("/api/customers/" + id + "/delete")
      .set("Authorization", token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Customer is deleted succesfully!",
            customer: expect.any(Object),
          })
        );
      });
  });
});

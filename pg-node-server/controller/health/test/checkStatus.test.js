import request from "supertest";
import app from "../../../app.js";

describe("Test the root path", () => {
  test("It should response the GET method and return status 'ok'", () => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("ok");
      });
  });
});

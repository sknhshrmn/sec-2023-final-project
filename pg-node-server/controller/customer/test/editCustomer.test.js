import request from "supertest";
import app from "../../../app";

const id = 1;
// Renew token everytime want to test
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2FraW5haF9zaGFocmltYW4iLCJlbWFpbCI6ImFraW5rYXk5QGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiU2l0aSBOdXJzYWtpbmFoIFNoYWhyaW1hbiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2ODkxOTQ2MjEsImV4cCI6MTY4OTE5ODIyMX0.PA9CI95JfKjbg0CRzWn7FiX3anOpBOxXjImtfVs4Xr8";

//  Case 1: Empty fields
describe("Try edit customer with empty fullname fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customerwith empty gender fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty birthday fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty smoking fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: null,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty critical illness fields", () => {
  test("It should return status code 200 and return message = Customer updated successfully", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Customer updated successfully");
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            customer: expect.any(Object),
          })
        );
      });
  });
});

describe("Try edit customer with empty insurance type fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty insurance budget fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty email fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty mobile no fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try edit customer with empty message fields", () => {
  test("It should return status code 200 and return message = Customer updated successfully", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "",
        quotation_sent: true,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Customer updated successfully");
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            customer: expect.any(Object),
          })
        );
      });
  });
});

describe("Try edit customer with empty status of quotation fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .put("/api/customers/" + id + "/edit")
      .set("Authorization", token)
      .send({
        fullname: "ALi Habibi",
        gender: "Male",
        birthday: "1992-07-22",
        smoking: true,
        critical_illness: "migraine",
        insurance_type: "Takaful",
        insurance_budget: "RM200-RM250",
        email: "heyyobgbg@gmail.com",
        mobile_no: "0123713984840",
        message: "Salam, minta tolong send quotation dekat whatsapp ya",
        quotation_sent: null,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });

  //   Case 2: Invalid birthday, not date
  describe("Try edit customer using invalid birth date", () => {
    test("It should return status code 403 and return message Invalid Request", async () => {
      return request(app)
        .put("/api/customers/" + id + "/edit")
        .set("Authorization", token)
        .send({
          fullname: "ALi Habibi",
          gender: "Male",
          birthday: "1992-0a7-22",
          smoking: true,
          critical_illness: "migraine",
          insurance_type: "Takaful",
          insurance_budget: "RM200-RM250",
          email: "heyyobgbg@gmail.com",
          mobile_no: "0123713984840",
          message: "Salam, minta tolong send quotation dekat whatsapp ya",
          quotation_sent: true,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  //   Case 3: Invalid email
  describe("Try edit customer using invalid email", () => {
    test("It should return status code 403 and return message Invalid Request", async () => {
      return request(app)
        .put("/api/customers/" + id + "/edit")
        .set("Authorization", token)
        .send({
          fullname: "ALi Habibi",
          gender: "Male",
          birthday: "1992-07-22",
          smoking: true,
          critical_illness: "migraine",
          insurance_type: "Takaful",
          insurance_budget: "RM200-RM250",
          email: "heyyobgbg@g@mail.com",
          mobile_no: "0123713984840",
          message: "Salam, minta tolong send quotation dekat whatsapp ya",
          quotation_sent: true,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  //   Case 4: Invalid type of boolean input of field smoking
  describe("Try edit customer using string in smoking field", () => {
    test("It should return status code 403 and return message Invalid request", async () => {
      return request(app)
        .put("/api/customers/" + id + "/edit")
        .set("Authorization", token)
        .send({
          fullname: "ALi Habibi",
          gender: "Male",
          birthday: "1992-07-22",
          smoking: "true:",
          critical_illness: "migraine",
          insurance_type: "Takaful",
          insurance_budget: "RM200-RM250",
          email: "heyyobgbg@gmail.com",
          mobile_no: "0123713984840",
          message: "Salam, minta tolong send quotation dekat whatsapp ya",
          quotation_sent: true,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  //   Case 5: Invalid type of boolean input of field quotation_sent
  describe("Try edit customer using string in quotaion_sent field", () => {
    test("It should return status code 403 and return message Invalid request", async () => {
      return request(app)
        .put("/api/customers/" + id + "/edit")
        .set("Authorization", token)
        .send({
          fullname: "ALi Habibi",
          gender: "Male",
          birthday: "1992-07-22",
          smoking: "true:",
          critical_illness: "migraine",
          insurance_type: "Takaful",
          insurance_budget: "RM200-RM250",
          email: "heyyobgbg@gmail.com",
          mobile_no: "0123713984840",
          message: "Salam, minta tolong send quotation dekat whatsapp ya",
          quotation_sent: "true",
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  // Case 5: Correct inputs for all fields
  describe("Try edit customer with correct input all fields", () => {
    test("It should return status code 200 and return message = Customer updated successfully", () => {
      request(app)
        .put("/api/customers/" + id + "/edit")
        .set("Authorization", token)
        .send({
          fullname: "ALi Habibi",
          gender: "Male",
          birthday: "1992-07-22",
          smoking: true,
          critical_illness: "migraine",
          insurance_type: "Takaful",
          insurance_budget: "RM200-RM250",
          email: "heyyobgbg@gmail.com",
          mobile_no: "0123713984840",
          message: "Salam, minta tolong send quotation dekat whatsapp ya",
          quotation_sent: true,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual(
            "Customer updated successfully"
          );
          expect(response.body.serverRes).toEqual(
            expect.objectContaining({
              customer: expect.any(Object),
            })
          );
        });
    });
  });
});

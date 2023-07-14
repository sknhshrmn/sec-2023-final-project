import request from "supertest";
import app from "../../../app";

//  Case 1: Empty fields
describe("Try submit form with empty fullname fields", () => {
  test("It should return status code 403 and return message = Invalid Request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "",
        insurance_type: "hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty gender fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "",
        insurance_type: "hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty birthday fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "",
        smoking: false,
        critical_illness: "",
        insurance_type: "hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty smoking fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: null,
        critical_illness: "",
        insurance_type: "hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty critical illness fields", () => {
  test("It should return status code 200 and return message = A customer created succesfully", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "",
        insurance_type: "Hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        eexpect(response.body.message).toEqual(
          "A customer created succesfully"
        );
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            customer: expect.any(Object),
          })
        );
      });
  });
});

describe("Try submit form with empty insurance type fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "hbp",
        insurance_type: "",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty insurance budget fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "HBP",
        insurance_type: "Hibah",
        insurance_budget: "",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty email fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "gastric",
        insurance_type: "hibah",
        insurance_budget: "RM200-RM250",
        email: "",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty mobile no fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "migraine",
        insurance_type: "Hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });
});

describe("Try submit form with empty message fields", () => {
  test("It should return status code 200 and return message = A customer created succesfully", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "athma",
        insurance_type: "Hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "",
        quotation_sent: false,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("A customer created succesfully");
        expect(response.body.serverRes).toEqual(
          expect.objectContaining({
            customer: expect.any(Object),
          })
        );
      });
  });
});

describe("Try submit form with empty status of quotation fields", () => {
  test("It should return status code 403 and return message = Invalid request", () => {
    request(app)
      .post("/api/customers/create")
      .send({
        fullname: "Sulli Aziz",
        gender: "Female",
        birthday: "1993-09-22",
        smoking: false,
        critical_illness: "athma",
        insurance_type: "Hibah",
        insurance_budget: "RM200-RM250",
        email: "dontoka@gmail.com",
        mobile_no: "0123345840",
        message: "Saya nak cari quotation yg elok, asap. Tq",
        quotation_sent: null,
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual("Invalid request");
      });
  });

  //   Case 2: Invalid birthday, not date
  describe("Try submit form using invalid birth date", () => {
    test("It should return status code 403 and return message Invalid Request", async () => {
      return request(app)
        .post("/api/customers/create")
        .send({
          fullname: "Sulli Aziz",
          gender: "Female",
          birthday: "1993-99-22",
          smoking: false,
          critical_illness: "athma",
          insurance_type: "Hibah",
          insurance_budget: "RM200-RM250",
          email: "dontoka@gmail.com",
          mobile_no: "0123345840",
          message: "Saya nak cari quotation yg elok, asap. Tq",
          quotation_sent: false,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  //   Case 3: Invalid email
  describe("Try submit form using invalid email", () => {
    test("It should return status code 403 and return message Invalid Request", async () => {
      return request(app)
        .post("/api/customers/create")
        .send({
          fullname: "Sulli Aziz",
          gender: "Female",
          birthday: "1993-09-22",
          smoking: false,
          critical_illness: "athma",
          insurance_type: "Hibah",
          insurance_budget: "RM200-RM250",
          email: "dontokagmail.com",
          mobile_no: "0123345840",
          message: "Saya nak cari quotation yg elok, asap. Tq",
          quotation_sent: false,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  //   Case 4: Invalid type of boolean input of field smoking
  describe("Try submit form using string in smoking field", () => {
    test("It should return status code 403 and return message Invalid request", async () => {
      return request(app)
        .post("/api/customers/create")
        .send({
          fullname: "Sulli Aziz",
          gender: "Female",
          birthday: "1993-09-22",
          smoking: "false",
          critical_illness: "athma",
          insurance_type: "Hibah",
          insurance_budget: "RM200-RM250",
          email: "dontokagmail.com",
          mobile_no: "0123345840",
          message: "Saya nak cari quotation yg elok, asap. Tq",
          quotation_sent: false,
        })
        .then((response) => {
          expect(response.statusCode).toBe(403);
          expect(response.body.message).toEqual("Invalid request");
        });
    });
  });

  // Case 5: Correct inputs for all fields
  describe("Try submit form with correct input all fields", () => {
    test("It should return status code 200 and return message = A customer created succesfully", () => {
      request(app)
        .post("/api/customers/create")
        .send({
          fullname: "Sulli Aziz",
          gender: "Female",
          birthday: "1993-09-22",
          smoking: "female",
          critical_illness: "athma",
          insurance_type: "Hibah",
          insurance_budget: "RM200-RM250",
          email: "dontoka@gmail.com",
          mobile_no: "0123345840",
          message: "Are you free on Monday",
          quotation_sent: false,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toEqual(
            "A customer created succesfully"
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

const emailValidate = require('./emailValidation');

test("email must not contain whitespace and valid provider", () => {
    expect(emailValidate.convertToEmail("prihanto ", "yahoo")).toBe("preffix contains white space");
    expect(emailValidate.convertToEmail("prihanto", "yahoo")).toBe("prihanto@yahoo.com");
    expect(emailValidate.convertToEmail("prihanto", "google")).toBe("prihanto@gmail.com");
    expect(emailValidate.convertToEmail("prihanto", " ")).toBe("Provider not found");
});



describe("priceCents", () => {
  
  it("should convert 100 cents to '1.00'", () => {
    expect(priceCents(100)).toBe("1.00");
  });

  it("should convert 250 cents to '2.50'", () => {
    expect(priceCents(250)).toBe("2.50");
  });

  it("should convert 0 cents to '0.00'", () => {
    expect(priceCents(0)).toBe("0.00");
  });

  it("should handle floating point numbers correctly", () => {
    expect(priceCents(199)).toBe("1.99");
  });

  it("should convert negative values", () => {
    expect(priceCents(-500)).toBe("-5.00");
  });

});

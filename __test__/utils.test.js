const { createLookupObject } = require("../db/seeds/utils");

describe("createLookupObject", () => {
  test("should return an empty object when given an empty array", () => {
    expect(createLookupObject([], "name", "id")).toEqual({});
  });
  test("should return a single key/value pair when given an array with one object", () => {
    const arr = [{ id: 1, name: "Jim", age: 20 }];
    const expected = { Jim: 1 };
    expect(createLookupObject(arr, "name", "id")).toEqual(expected);
  });
  test("should return an object mapping keys to values when given multiple objects", () => {
    const arr = [
      { id: 1, name: "Jim", age: 20 },
      { id: 2, name: "Jhon", age: 25 },
      { id: 3, name: "Smith", age: 30 },
    ];
    const expected = { Jim: 1, Jhon: 2, Smith: 3 };
    expect(createLookupObject(arr, "name", "id")).toEqual(expected);
  });
  test("should return an object mapping keys to alternate property values when given different key/value arguments", () => {
    const arr = [
      { id: 1, name: "Jim", age: 20 },
      { id: 2, name: "Jhon", age: 25 },
      { id: 3, name: "Smith", age: 30 },
    ];
    const expected = { Jim: 20, Jhon: 25, Smith: 30 };
    expect(createLookupObject(arr, "name", "age")).toEqual(expected);
  });
  test("should skip objects missing either key or value properties", () => {
    const arr = [{ id: 1, name: "Jim" }, { id: 2 }, { name: "Smith" }];
    const expected = { Jim: 1 };
    expect(createLookupObject(arr, "name", "id")).toEqual(expected);
  });
  test("should handle non-string key and value types correctly", () => {
    const arr = [
      { key: 1, value: true },
      { key: 2, value: false },
    ];
    const expected = { 1: true, 2: false };
    expect(createLookupObject(arr, "key", "value")).toEqual(expected);
  });
  test("should not mutate the original array", () => {
    const arr = [
      { id: 1, name: "Jim" },
      { id: 2, name: "Jhon" },
    ];
    const arrCopy = [...arr];

    createLookupObject(arr, "name", "id");

    expect(arr).toEqual(arrCopy);
  });
});

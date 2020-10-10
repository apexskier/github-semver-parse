jest.mock("@actions/core");

test("main test", async () => {
  const core = require("@actions/core");
  core.getInput.mockImplementationOnce((key: string) => {
    expect(key).toBe("version");
    return "v1.12.123-alpha.1+BUILD.ID";
  });

  require("./index");

  await new Promise((resolve) => setImmediate(() => resolve()));

  expect(core.setOutput.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "major",
        1,
      ],
      Array [
        "minor",
        12,
      ],
      Array [
        "patch",
        123,
      ],
      Array [
        "prerelease",
        "alpha.1",
      ],
      Array [
        "build",
        "BUILD.ID",
      ],
      Array [
        "version",
        "1.12.123-alpha.1",
      ],
    ]
  `);
});

test("GET to API/V1/STATUS should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.db_version).toBe("16.9");
  expect(responseBody.dependencies.max_connection).toBe(100);
  expect(responseBody.dependencies.used_connection).toBe(1);
  console.log(parsedUpdatedAt);
});

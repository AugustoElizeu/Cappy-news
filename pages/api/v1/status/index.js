import database from "/infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = dbVersionResult.rows[0].server_version.toString();

  const dbMaxCon = await database.query("SHOW max_connections;");
  const dbMaxConnection = dbMaxCon.rows[0].max_connections.toString();

  const databaseName = process.env.POSTGRES_DB;
  console.log(databaseName);
  const dbActiveCon = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const dbActiveConnections = dbActiveCon.rows[0].count;
  console.log(dbActiveConnections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      db_version: dbVersion,
      max_connection: parseInt(dbMaxConnection),
      used_connection: dbActiveConnections,
    },
  });
}

export default status;

import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import * as path from 'path';

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    const connection1 = getConnection();
    await connection1.manager.query(`DELETE FROM migrations`);
    await connection1.close();
  },

  async clear() {
    const connection1 = getConnection();
    const entities = connection1.entityMetadatas;
    for (const entity of entities) {
      await connection1.manager.query(`DELETE FROM ${entity.tableName}`);
    }
  },
};
export default connection;

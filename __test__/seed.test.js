const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seeding", () => {
  describe("users table", () => {
    test("users table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables
            WHERE 
                table_name = 'users'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("users table has a user_id column as a serial", () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("user_id");
          expect(column.data_type).toBe("integer");
          expect(column.column_default).toBe(
            "nextval('users_user_id_seq'::regclass)"
          );
        });
    });

    test("users table has the user_id column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'users';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("user_id");
        });
    });

    test("users table has a first_name column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'first_name';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("first_name");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a surname column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'surname';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("surname");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a email column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'email';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("email");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a phone_no column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'phone_no';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("phone_no");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a password column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'password';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("password");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a type column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'type';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("type");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("users table has a reg_status column as a boolean", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = 'reg_status';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("reg_status");
          expect(column.data_type).toBe("boolean");
        });
    });
  });

  describe("reasons table", () => {
    test("reasons table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
            SELECT FROM 
                information_schema.tables
            WHERE 
                table_name = 'reasons'
            );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });

    test("reasons table has a description column as a varying character", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'reasons'
            AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("description");
          expect(column.data_type).toBe("character varying");
        });
    });

    test("reasons table has the description column as the primary key", () => {
      return db
        .query(
          `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'reasons';`
        )
        .then(({ rows: [{ column_name }] }) => {
          expect(column_name).toBe("description");
        });
    });

    test("reasons table has a est_wait column as a integer", () => {
      return db
        .query(
          `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'reasons'
            AND column_name = 'est_wait';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe("est_wait");
          expect(column.data_type).toBe("integer");
        });
    });
  });
});

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1738804478771 implements MigrationInterface {
  name = 'InitialMigration1738804478771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ENUMs
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('CITIZEN', 'OFFICER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."crime_report_status_enum" AS ENUM('PENDING', 'INVESTIGATING', 'RESOLVED', 'CLOSED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."crime_investigation_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'CLOSED')`,
    );

    // Users table (frequently searched by email, badge number)
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR UNIQUE NOT NULL,
        "password" VARCHAR NOT NULL,
        "full_name" VARCHAR NOT NULL,
        "role" "public"."user_role_enum" NOT NULL DEFAULT 'CITIZEN',
        "badge_number" VARCHAR,
        "department" VARCHAR,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_user_badge_number" ON "user" ("badge_number") WHERE "badge_number" IS NOT NULL`,
    );
    await queryRunner.query(`CREATE INDEX "idx_user_role" ON "user" ("role")`);

    // Crime Categories (searched by name)
    await queryRunner.query(`
      CREATE TABLE "crime_category" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR UNIQUE NOT NULL,
        "description" TEXT
      )
    `);

    // Crime Reports (frequently searched by status, date, location)
    await queryRunner.query(`
      CREATE TABLE "crime_report" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "location" VARCHAR NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "status" "public"."crime_report_status_enum" NOT NULL DEFAULT 'PENDING',
        "category_id" INTEGER REFERENCES "crime_category"("id"),
        "user_id" INTEGER REFERENCES "user"("id"),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_crime_report_status" ON "crime_report" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_crime_report_date" ON "crime_report" ("date")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_crime_report_location" ON "crime_report" USING gin (to_tsvector('english', "location"))`,
    );

    // Crime Comments
    await queryRunner.query(`
      CREATE TABLE "crime_comment" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL,
        "report_id" INTEGER REFERENCES "crime_report"("id") ON DELETE CASCADE,
        "author_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_crime_comment_report" ON "crime_comment" ("report_id")`,
    );

    // Crime Investigations (frequently searched by status, officer)
    await queryRunner.query(`
      CREATE TABLE "crime_investigation" (
        "id" SERIAL PRIMARY KEY,
        "report_id" INTEGER REFERENCES "crime_report"("id") ON DELETE CASCADE,
        "officer_id" INTEGER,
        "notes" TEXT,
        "status" "public"."crime_investigation_status_enum" NOT NULL DEFAULT 'OPEN',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_investigation_status" ON "crime_investigation" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_investigation_officer" ON "crime_investigation" ("officer_id")`,
    );

    // Notifications (frequently searched by user and read status)
    await queryRunner.query(`
      CREATE TABLE "notification" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "message" TEXT NOT NULL,
        "is_read" BOOLEAN NOT NULL DEFAULT false,
        "user_id" INTEGER REFERENCES "user"("id") ON DELETE CASCADE,
        "created_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "idx_notification_user_read" ON "notification" ("user_id", "is_read")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "notification" CASCADE`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "crime_investigation" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "crime_comment" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "crime_report" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "crime_category" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user" CASCADE`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."crime_investigation_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."crime_report_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_role_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1707660657247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "public"."roles" ("id", "name") VALUES
    (1, 'Super Admin'),
    (2, 'Normal User');
    `);

    await queryRunner.query(`
    INSERT INTO "public"."scopes" ("id", "action", "entity") VALUES
    (1, 'READ', 'user'),
    (2, 'CREATE', 'user'),
    (3, 'UPDATE', 'user'),
    (4, 'DELETE', 'user'),
    (5, 'RESTORE', 'user'),
    (6, 'READ', 'quiz'),
    (7, 'CREATE', 'quiz'),
    (8, 'UPDATE', 'quiz'),
    (9, 'DELETE', 'quiz'),
    (10, 'RESTORE', 'quiz'),
    (11, 'READ', 'quiz_version'),
    (12, 'CREATE', 'quiz_version'),
    (13, 'UPDATE', 'quiz_version'),
    (14, 'DELETE', 'quiz_version'),
    (15, 'RESTORE', 'quiz_version'),
    (16, 'READ', 'question'),
    (17, 'CREATE', 'question'),
    (18, 'UPDATE', 'question'),
    (19, 'DELETE', 'question'),
    (20, 'RESTORE', 'question'),
    (21, 'READ', 'question_option'),
    (22, 'CREATE', 'question_option'),
    (23, 'UPDATE', 'question_option'),
    (24, 'DELETE', 'question_option'),
    (25, 'RESTORE', 'question_option');
    `);

    await queryRunner.query(`
    INSERT INTO "public"."role_scope" ("scopes_id","roles_id") VALUES
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,1),
    (6,1),
    (7,1),
    (8,1),
    (9,1),
    (10,1),
    (11,1),
    (12,1),
    (13,1),
    (14,1),
    (15,1),
    (16,1),
    (17,1),
    (18,1),
    (19,1),
    (20,1),
    (21,1),
    (22,1),
    (23,1),
    (24,1),
    (25,1),
    (1,2),
    (2,2),
    (3,2),
    (4,2),
    (6,2),
    (7,2);
    `);

    await queryRunner.query(`INSERT INTO "public"."users" ("created_at", "updated_at", "deleted_at", "id", "first_name", "last_name", "phone", "password", "role_id", "avatar") VALUES
    ('2024-02-13 16:16:42.327936', '2024-02-13 16:16:42.327936', NULL, '76fe4045-69ab-4cea-a380-957c42045a2d', 'Tuan', 'player', '4d1a54d551007d08cc228de91b0cb1ee', '$2b$10$FdpLk4vP7yYyQE1qXfmpiuFsypneH85E6eO4OkG69xZwXfbL4YXqK', 2, NULL),
    ('2024-02-11 11:42:27.496827', '2024-02-11 11:42:27.496827', NULL, 'a17a6714-3a9e-43a0-9ba6-7bcdbdb87c70', 'Tuan', 'Admin', '3a3d15b91954eebe2b4e34b23253cf8e', '$2b$10$msAbvepq.mHhzb27GnngN.5KC9qD22YGIo6v7F4to91pKoVSaiJeu', 1, '');
    `);

    await queryRunner.query(` INSERT INTO "public"."info_latest_signin" (id, "user_id") VALUES
    ('1','a17a6714-3a9e-43a0-9ba6-7bcdbdb87c70'),
    ('2','76fe4045-69ab-4cea-a380-957c42045a2d');
    `);

    await queryRunner.query(`INSERT INTO "public"."info_user" ("id", "coin", "user_id") VALUES
    (2, 0, '76fe4045-69ab-4cea-a380-957c42045a2d');
    `);

    await queryRunner.query(`INSERT INTO "public"."quiz" ("created_at", "updated_at", "deleted_at", "id", "name", "expire_at", "status", "selected_version_id", "created_by_id") VALUES
    ('2024-02-11 16:48:17.329534', '2024-02-11 16:48:17.329534', NULL, '674c228c-0d16-439f-8d3b-4a3e4296d188', 'test', NULL, 'ACTIVE', NULL, 'a17a6714-3a9e-43a0-9ba6-7bcdbdb87c70');`);

    await queryRunner.query(`INSERT INTO "public"."quiz_versions" ("id", "reward", "description", "version_number", "created_by_id", "quiz_id") VALUES
    ('592d14a4-4607-447d-b2c7-18816a9b9ace', 100, 'test', 1, 'a17a6714-3a9e-43a0-9ba6-7bcdbdb87c70', '674c228c-0d16-439f-8d3b-4a3e4296d188');`);

    await queryRunner.query(
      `UPDATE "public"."quiz" SET "selected_version_id" = '592d14a4-4607-447d-b2c7-18816a9b9ace' WHERE "id" = '674c228c-0d16-439f-8d3b-4a3e4296d188';`,
    );

    await queryRunner.query(`INSERT INTO "public"."questions" ("created_at", "updated_at", "deleted_at", "id", "type", "title", "hint") VALUES
    ('2024-02-11 16:17:53.195479', '2024-02-11 16:17:53.195479', NULL, 1, 'CHOICE', 'How can you accumulate and use membership points with vani?', '*To earn/use membership points with vani benefits, scan the Vani Barcode'),
    ('2024-02-11 16:17:53.195479', '2024-02-11 16:17:53.195479', NULL, 2, 'CHOICE', 'What is an additional reward when you earn membership points with vani?', '*Earn/use membership points with vani. Open Ice Cream. Get Vani Coins'),
    ('2024-02-11 16:17:53.195479', '2024-02-11 16:17:53.195479', NULL, 3, 'CHOICE', 'There is another way to get Vani Coin. What is it? ', '*You can get additional Vani Coins when you play Shake once a day'),
    ('2024-02-11 16:17:53.195479', '2024-02-11 16:17:53.195479', NULL, 4, 'MULTIPLE_CHOICE', 'How can you use Vani Coin?', '*Your Vani Coins can be exchanged for other membership points or Vouchers'),
    ('2024-02-11 16:17:53.195479', '2024-02-11 16:17:53.195479', NULL, 5, 'YES_NO', 'One plus one equals 3 zero?', 'Raise two fingers');
    `);

    await queryRunner.query(`
    INSERT INTO "public"."question_options" ("created_at", "updated_at", "deleted_at", "id", "text", "is_correct", "order", "question_id") VALUES
    ('2024-02-11 17:06:02.111613', '2024-02-11 17:06:02.111613', NULL, 1, 'Hand over membership card', 'f', 1, 1),
    ('2024-02-11 17:06:02.111613', '2024-02-11 17:06:02.111613', NULL, 2, 'Tell your Phone number', 'f', 2, 1),
    ('2024-02-11 17:06:02.111613', '2024-02-11 17:06:02.111613', NULL, 3, 'Show Vani Barcode on the Home screen', 't', 3, 1),
    ('2024-02-11 17:06:56.834365', '2024-02-11 17:06:56.834365', NULL, 4, 'Vani Point', 'f', 1, 2),
    ('2024-02-11 17:06:56.834365', '2024-02-11 17:06:56.834365', NULL, 5, 'Vani Coin', 't', 2, 2),
    ('2024-02-11 17:06:56.834365', '2024-02-11 17:06:56.834365', NULL, 6, 'Vani Money', 'f', 3, 2),
    ('2024-02-11 17:15:45.743634', '2024-02-11 17:15:45.743634', NULL, 7, 'Leave a 1:1 inquiry', 'f', 1, 3),
    ('2024-02-11 17:15:45.743634', '2024-02-11 17:15:45.743634', NULL, 8, 'Run the Vani app every day', 'f', 2, 3),
    ('2024-02-11 17:15:45.743634', '2024-02-11 17:15:45.743634', NULL, 9, 'Play Shake', 't', 3, 3),
    ('2024-02-11 17:17:45.184771', '2024-02-11 17:17:45.184771', NULL, 10, 'Exchange to Voucher', 't', 1, 4),
    ('2024-02-11 17:17:45.184771', '2024-02-11 17:17:45.184771', NULL, 11, 'Buy a product at stores', 'f', 2, 4),
    ('2024-02-11 17:17:45.184771', '2024-02-11 17:17:45.184771', NULL, 12, 'Exchange to membership points', 't', 3, 4),
    ('2024-02-11 17:17:45.184771', '2024-02-11 17:17:45.184771', NULL, 13, 'Yes', 'f', 1, 5),
    ('2024-02-11 17:17:45.184771', '2024-02-11 17:17:45.184771', NULL, 14, 'No', 't', 2, 5);
    `);

    await queryRunner.query(`INSERT INTO "public"."version_question" ("question_id", "order", "version_id") VALUES
    (1, 1, '592d14a4-4607-447d-b2c7-18816a9b9ace'),
    (2, 2, '592d14a4-4607-447d-b2c7-18816a9b9ace'),
    (3, 3, '592d14a4-4607-447d-b2c7-18816a9b9ace'),
    (4, 4, '592d14a4-4607-447d-b2c7-18816a9b9ace'),
    (5, 5, '592d14a4-4607-447d-b2c7-18816a9b9ace');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "public"."role_scope"`);
    await queryRunner.query(`DELETE FROM "public"."scope"`);
    await queryRunner.query(`DELETE FROM "public"."role"`);
    await queryRunner.query(`DELETE FROM "public"."user"`);
  }
}

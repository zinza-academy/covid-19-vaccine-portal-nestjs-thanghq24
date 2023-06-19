import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserDivisionRelation1687161667420
  implements MigrationInterface
{
  name = 'UpdateUserDivisionRelation1687161667420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`province\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`district\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ward\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`province_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`district_id\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`ward_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_7d00b75aed2308608f48945d5fc\` FOREIGN KEY (\`province_id\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_7fe3e7044d6a8573464c532e4fd\` FOREIGN KEY (\`district_id\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a05a50c5564ef8a703c63946da0\` FOREIGN KEY (\`ward_id\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a05a50c5564ef8a703c63946da0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_7fe3e7044d6a8573464c532e4fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_7d00b75aed2308608f48945d5fc\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ward_id\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`district_id\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`province_id\``);
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`ward\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`district\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`province\` int NOT NULL`,
    );
  }
}

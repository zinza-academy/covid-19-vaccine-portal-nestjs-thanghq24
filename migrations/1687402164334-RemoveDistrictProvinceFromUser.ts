import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDistrictProvinceFromUser1687402164334
  implements MigrationInterface
{
  name = 'RemoveDistrictProvinceFromUser1687402164334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_7d00b75aed2308608f48945d5fc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_7fe3e7044d6a8573464c532e4fd\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`district_id\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`province_id\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`province_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`district_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_7fe3e7044d6a8573464c532e4fd\` FOREIGN KEY (\`district_id\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_7d00b75aed2308608f48945d5fc\` FOREIGN KEY (\`province_id\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

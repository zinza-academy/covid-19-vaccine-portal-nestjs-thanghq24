import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRegistrationResultDate1688107881036 implements MigrationInterface {
    name = 'ChangeRegistrationResultDate1688107881036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP COLUMN \`injecting_time\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD \`injecting_time\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP COLUMN \`injecting_time\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD \`injecting_time\` date NULL`);
    }

}

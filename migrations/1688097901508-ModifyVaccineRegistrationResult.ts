import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyVaccineRegistrationResult1688097901508 implements MigrationInterface {
    name = 'ModifyVaccineRegistrationResult1688097901508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP FOREIGN KEY \`FK_f637deaf209330adb1ba552443b\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` CHANGE \`injecting_time\` \`injecting_time\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` CHANGE \`vaccine_registration_id\` \`vaccine_registration_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD CONSTRAINT \`FK_f637deaf209330adb1ba552443b\` FOREIGN KEY (\`vaccine_registration_id\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP FOREIGN KEY \`FK_f637deaf209330adb1ba552443b\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` CHANGE \`vaccine_registration_id\` \`vaccine_registration_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` CHANGE \`injecting_time\` \`injecting_time\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD CONSTRAINT \`FK_f637deaf209330adb1ba552443b\` FOREIGN KEY (\`vaccine_registration_id\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

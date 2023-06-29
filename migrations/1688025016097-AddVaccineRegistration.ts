import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVaccineRegistration1688025016097 implements MigrationInterface {
    name = 'AddVaccineRegistration1688025016097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccine_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`batch_number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vaccine_registration_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`injecting_time\` date NOT NULL, \`vaccine_type_id\` int NULL, \`vaccination_site_id\` int NULL, \`vaccine_registration_id\` int NULL, UNIQUE INDEX \`REL_f637deaf209330adb1ba552443\` (\`vaccine_registration_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vaccine_registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0', \`priority_type\` int NOT NULL, \`job\` int NOT NULL, \`workplace\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`appointment_date\` date NOT NULL, \`day_phase\` int NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD CONSTRAINT \`FK_c1ae56818626760c5a7cd7a34e6\` FOREIGN KEY (\`vaccine_type_id\`) REFERENCES \`vaccine_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD CONSTRAINT \`FK_f267f1ac9e3baee15f1d8d8ffff\` FOREIGN KEY (\`vaccination_site_id\`) REFERENCES \`vaccination_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` ADD CONSTRAINT \`FK_f637deaf209330adb1ba552443b\` FOREIGN KEY (\`vaccine_registration_id\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_d93cc97cd365edf8b4a60802a22\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_d93cc97cd365edf8b4a60802a22\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP FOREIGN KEY \`FK_f637deaf209330adb1ba552443b\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP FOREIGN KEY \`FK_f267f1ac9e3baee15f1d8d8ffff\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_result\` DROP FOREIGN KEY \`FK_c1ae56818626760c5a7cd7a34e6\``);
        await queryRunner.query(`DROP TABLE \`vaccine_registration\``);
        await queryRunner.query(`DROP INDEX \`REL_f637deaf209330adb1ba552443\` ON \`vaccine_registration_result\``);
        await queryRunner.query(`DROP TABLE \`vaccine_registration_result\``);
        await queryRunner.query(`DROP TABLE \`vaccine_type\``);
    }

}

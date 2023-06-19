import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminstrativeDivision1687143966916 implements MigrationInterface {
    name = 'CreateAdminstrativeDivision1687143966916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`province\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ward\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`district_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`province_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(50) NOT NULL, \`email\` varchar(320) NOT NULL, \`password\` varchar(255) NOT NULL, \`health_insurance_number\` varchar(15) NOT NULL, \`dob\` date NOT NULL, \`gender\` enum ('M', 'F') NOT NULL, \`citizen_identification\` bigint NOT NULL, \`province\` int NOT NULL, \`district\` int NOT NULL, \`ward\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_d0e5815877f7395a198a4cb0a4\` (\`user_id\`), INDEX \`IDX_32a6fc2fcb019d8e3a8ace0f55\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_9e43d07a260e84896d308b8c1a4\` FOREIGN KEY (\`district_id\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_20bbec53bfceb008df55035d900\` FOREIGN KEY (\`province_id\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\``);
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_20bbec53bfceb008df55035d900\``);
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_9e43d07a260e84896d308b8c1a4\``);
        await queryRunner.query(`DROP INDEX \`IDX_32a6fc2fcb019d8e3a8ace0f55\` ON \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_d0e5815877f7395a198a4cb0a4\` ON \`user_role\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`district\``);
        await queryRunner.query(`DROP TABLE \`ward\``);
        await queryRunner.query(`DROP TABLE \`province\``);
    }

}

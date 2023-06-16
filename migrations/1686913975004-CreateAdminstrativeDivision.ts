import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminstrativeDivision1686913975004 implements MigrationInterface {
    name = 'CreateAdminstrativeDivision1686913975004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`province\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ward\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`districtId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_19a3bc9b3be291e8b9bc2bb623b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_23a21b38208367a242b1dd3a424\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_23a21b38208367a242b1dd3a424\``);
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_19a3bc9b3be291e8b9bc2bb623b\``);
        await queryRunner.query(`DROP TABLE \`district\``);
        await queryRunner.query(`DROP TABLE \`ward\``);
        await queryRunner.query(`DROP TABLE \`province\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocumentAndFile1688522828609 implements MigrationInterface {
    name = 'CreateDocumentAndFile1688522828609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`file_id\` int NULL, UNIQUE INDEX \`REL_b9e7d1916962b81f2c3b5b5480\` (\`file_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`document\` ADD CONSTRAINT \`FK_b9e7d1916962b81f2c3b5b54804\` FOREIGN KEY (\`file_id\`) REFERENCES \`file\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` DROP FOREIGN KEY \`FK_b9e7d1916962b81f2c3b5b54804\``);
        await queryRunner.query(`DROP TABLE \`file\``);
        await queryRunner.query(`DROP INDEX \`REL_b9e7d1916962b81f2c3b5b5480\` ON \`document\``);
        await queryRunner.query(`DROP TABLE \`document\``);
    }

}

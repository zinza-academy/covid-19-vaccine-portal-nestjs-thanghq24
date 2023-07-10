import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyFile1688957898015 implements MigrationInterface {
    name = 'ModifyFile1688957898015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`original_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD \`file_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`file_name\``);
        await queryRunner.query(`ALTER TABLE \`file\` DROP COLUMN \`original_name\``);
    }

}

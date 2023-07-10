import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDocumentNameUnique1688955011390 implements MigrationInterface {
    name = 'SetDocumentNameUnique1688955011390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` ADD UNIQUE INDEX \`IDX_6be4f75c40f5f3878d18d9806c\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`document\` DROP INDEX \`IDX_6be4f75c40f5f3878d18d9806c\``);
    }

}

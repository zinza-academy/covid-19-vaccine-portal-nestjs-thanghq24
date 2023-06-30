import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRegistrationStatusEnum1688105552429 implements MigrationInterface {
    name = 'ChangeRegistrationStatusEnum1688105552429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`status\` \`status\` enum ('REQUESTED', 'ACCEPTED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'REQUESTED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`status\` \`status\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0'`);
    }

}

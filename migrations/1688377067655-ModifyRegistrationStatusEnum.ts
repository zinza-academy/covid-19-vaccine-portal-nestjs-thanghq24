import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyRegistrationStatusEnum1688377067655 implements MigrationInterface {
    name = 'ModifyRegistrationStatusEnum1688377067655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`status\` \`status\` enum ('requested', 'accepted', 'rejected', 'completed') NOT NULL DEFAULT 'requested'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`status\` \`status\` enum ('REQUESTED', 'ACCEPTED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'REQUESTED'`);
    }

}

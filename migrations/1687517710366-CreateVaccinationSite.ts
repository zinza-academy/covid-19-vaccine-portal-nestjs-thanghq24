import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVaccinationSite1687517710366 implements MigrationInterface {
    name = 'CreateVaccinationSite1687517710366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccination_site\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`manager\` varchar(255) NOT NULL, \`table_number\` int NOT NULL, \`ward_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD CONSTRAINT \`FK_1d0e5c223d663af7553bd574459\` FOREIGN KEY (\`ward_id\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP FOREIGN KEY \`FK_1d0e5c223d663af7553bd574459\``);
        await queryRunner.query(`DROP TABLE \`vaccination_site\``);
    }

}

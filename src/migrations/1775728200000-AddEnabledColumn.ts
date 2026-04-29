import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnabledColumn1775728200000 implements MigrationInterface {
    name = 'AddEnabledColumn1775728200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`enabled\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`enabled\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`subscriptions\` ADD \`enabled\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscriptions\` DROP COLUMN \`enabled\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`enabled\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`enabled\``);
    }

}

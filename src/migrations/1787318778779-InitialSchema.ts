import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1787318778779 implements MigrationInterface {
    name = 'InitialSchema1787318778779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` varchar(50) NOT NULL, \`nombre\` varchar(200) NOT NULL, \`descripcion\` text NOT NULL, \`descripcionLarga\` text NOT NULL, \`slug\` varchar(100) NOT NULL, \`imagen\` varchar(500) NULL, \`enabled\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_b28b07d25e4324eee577de5496\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b28b07d25e4324eee577de5496\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
    }

}

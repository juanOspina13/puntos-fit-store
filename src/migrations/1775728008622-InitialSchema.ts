import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1775728008622 implements MigrationInterface {
    name = 'InitialSchema1775728008622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(50) NOT NULL, \`name\` varchar(100) NOT NULL, \`slug\` varchar(100) NOT NULL, \`image\` varchar(500) NOT NULL, \`description\` text NOT NULL, UNIQUE INDEX \`IDX_420d9f679d41281f282f5bc7d0\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(50) NOT NULL, \`name\` varchar(200) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(12,2) NOT NULL, \`precioCompra\` decimal(12,2) NULL, \`image\` varchar(500) NOT NULL, \`category\` varchar(100) NOT NULL, \`subcategory\` varchar(100) NULL, \`rating\` decimal(3,1) NOT NULL DEFAULT '0.0', \`reviews\` int NOT NULL DEFAULT '0', \`inStock\` tinyint NOT NULL DEFAULT 1, \`tags\` text NULL, \`puntosFit\` int NOT NULL DEFAULT '0', \`servicios\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscriptions\` (\`id\` varchar(50) NOT NULL, \`name\` varchar(200) NOT NULL, \`description\` text NOT NULL, \`monthlyPrice\` decimal(12,2) NOT NULL, \`originalPrice\` decimal(12,2) NOT NULL, \`discount\` decimal(5,2) NOT NULL DEFAULT '0.00', \`image\` varchar(500) NOT NULL, \`objetivo\` varchar(100) NOT NULL, \`objetivoLabel\` varchar(100) NOT NULL, \`frequency\` varchar(50) NOT NULL DEFAULT 'monthly', \`includedProducts\` text NOT NULL, \`benefits\` text NOT NULL, \`puntosFit\` int NOT NULL DEFAULT '0', \`rating\` decimal(3,1) NOT NULL DEFAULT '0.0', \`subscribers\` int NOT NULL DEFAULT '0', \`tags\` text NULL, \`icon\` varchar(100) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`subscriptions\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_420d9f679d41281f282f5bc7d0\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}

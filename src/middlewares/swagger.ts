import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

export const generateSwagger = async (app: INestApplication) => {
    try {
      const filePath = path.join(process.cwd(), 'docs/swagger.yaml');
      const file = await fs.readFileSync(filePath, 'utf8');
      const document = YAML.parse(file);
      return SwaggerModule.setup('api', app, document);
    } catch (error) {
      throw new Error(`Unable to read file: ${error.message}`);
    }
  };
  
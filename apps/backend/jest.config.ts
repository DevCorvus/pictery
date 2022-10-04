import dotenv from 'dotenv';
import { InitialOptionsTsJest, pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

dotenv.config();

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
};

export default config;

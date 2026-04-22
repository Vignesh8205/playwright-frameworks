import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './Logger';

/**
 * TestDataManager - Handles loading and retrieving test data from JSON files
 */
export class TestDataManager {
    private static logger = new Logger();

    /**
     * Load JSON data from a file
     * @param fileName Path to the JSON file relative to the project root
     */
    static loadData(fileName: string): any {
        try {
            const absolutePath = path.resolve(process.cwd(), fileName);
            this.logger.info(`Loading test data from: ${absolutePath}`);
            const fileContent = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            this.logger.error(`Error loading test data from ${fileName}: ${error}`);
            throw new Error(`Failed to load test data from ${fileName}`);
        }
    }

    /**
     * Resolve a value from a data object using a dot-notation path
     * @param data The data object
     * @param dataPath The path string (e.g., 'credentials.validUser.username')
     */
    static resolveValue(data: any, dataPath: string): any {
        if (!data) return dataPath;

        const parts = dataPath.split('.');
        let current = data;

        for (const part of parts) {
            if (current[part] === undefined) {
                this.logger.warn(`Data path not found: ${dataPath} (at ${part})`);
                return dataPath; // Return the path itself if not found, allowing literals
            }
            current = current[part];
        }

        return current;
    }

    /**
     * Check if a string looks like a data path (contains periods and exists in data)
     */
    static isDataPath(value: any): boolean {
        return typeof value === 'string' && value.includes('.');
    }

    /**
     * Resolves a data table (from Gherkin) by checking each value if it's a data path.
     * @param data The data object
     * @param tableData The table row data
     */
    static resolveDataTable(data: any, tableData: any): any {
        const resolvedData: any = {};
        for (const [key, value] of Object.entries(tableData)) {
            if (this.isDataPath(value)) {
                resolvedData[key] = this.resolveValue(data, value as string);
            } else {
                resolvedData[key] = value;
            }
        }
        return resolvedData;
    }
}

import * as fs from 'fs';
import * as path from 'path';

/**
 * CSV Reader/Writer Utility - Handle CSV files for test data
 */
export class CSVReader {
  
  /**
   * Read CSV file and return data as array of objects
   */
  static async readCSVFile(filePath: string, delimiter: string = ','): Promise<any[]> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`CSV file not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      
      if (lines.length === 0) {
        return [];
      }

      const headers = this.parseCSVLine(lines[0], delimiter);
      const data: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCSVLine(lines[i], delimiter);
        const row: any = {};
        
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || '';
        });
        
        data.push(row);
      }

      return data;
    } catch (error) {
      console.error('Error reading CSV file:', error);
      throw error;
    }
  }

  /**
   * Parse CSV line handling quoted values
   */
  private static parseCSVLine(line: string, delimiter: string = ','): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  /**
   * Write data to CSV file
   */
  static async writeCSVFile(
    data: any[],
    filePath: string,
    delimiter: string = ','
  ): Promise<void> {
    try {
      if (data.length === 0) {
        throw new Error('No data to write to CSV file');
      }

      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const headers = Object.keys(data[0]);
      let csvContent = headers.join(delimiter) + '\n';

      data.forEach(row => {
        const values = headers.map(header => {
          let value = row[header] || '';
          // Escape quotes and wrap in quotes if contains delimiter or quotes
          if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
            value = '"' + value.replace(/"/g, '""') + '"';
          }
          return value;
        });
        csvContent += values.join(delimiter) + '\n';
      });

      fs.writeFileSync(filePath, csvContent, 'utf-8');
      console.log(`CSV file written successfully: ${filePath}`);
    } catch (error) {
      console.error('Error writing CSV file:', error);
      throw error;
    }
  }

  /**
   * Read CSV file and filter by criteria
   */
  static async readCSVWithFilter(
    filePath: string,
    filterFn: (row: any) => boolean,
    delimiter: string = ','
  ): Promise<any[]> {
    const data = await this.readCSVFile(filePath, delimiter);
    return data.filter(filterFn);
  }

  /**
   * Read specific columns from CSV file
   */
  static async readCSVColumns(
    filePath: string,
    columns: string[],
    delimiter: string = ','
  ): Promise<any[]> {
    const data = await this.readCSVFile(filePath, delimiter);
    
    return data.map(row => {
      const filteredRow: any = {};
      columns.forEach(col => {
        if (row[col] !== undefined) {
          filteredRow[col] = row[col];
        }
      });
      return filteredRow;
    });
  }

  /**
   * Read test credentials from CSV file
   */
  static async readTestCredentials(filePath: string): Promise<any[]> {
    try {
      const data = await this.readCSVFile(filePath);
      return data;
    } catch (error) {
      console.error('Error reading test credentials from CSV:', error);
      throw error;
    }
  }

  /**
   * Create sample CSV file with test data
   */
  static async createSampleCSVFile(filePath: string): Promise<void> {
    const sampleData = [
      {
        username: 'user1@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        status: 'active'
      },
      {
        username: 'user2@test.com',
        password: 'password456',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active'
      },
      {
        username: 'user3@test.com',
        password: 'password789',
        firstName: 'Bob',
        lastName: 'Johnson',
        status: 'active'
      }
    ];

    await this.writeCSVFile(sampleData, filePath);
    console.log(`Sample CSV file created: ${filePath}`);
  }

  /**
   * Validate CSV file structure
   */
  static validateCSVStructure(
    filePath: string,
    requiredColumns: string[],
    delimiter: string = ','
  ): { isValid: boolean; missingColumns: string[] } {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      if (lines.length === 0) {
        return { isValid: false, missingColumns: requiredColumns };
      }

      const headers = this.parseCSVLine(lines[0], delimiter)
        .map(h => h.trim());
      
      const missingColumns = requiredColumns.filter(col => 
        !headers.includes(col)
      );
      
      return {
        isValid: missingColumns.length === 0,
        missingColumns
      };
    } catch (error) {
      console.error('Error validating CSV structure:', error);
      return { isValid: false, missingColumns: requiredColumns };
    }
  }

  /**
   * Convert CSV to JSON format
   */
  static async csvToJSON(
    csvFilePath: string,
    jsonFilePath: string,
    delimiter: string = ','
  ): Promise<void> {
    try {
      const data = await this.readCSVFile(csvFilePath, delimiter);
      const jsonContent = JSON.stringify(data, null, 2);
      
      const dir = path.dirname(jsonFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(jsonFilePath, jsonContent, 'utf-8');
      console.log(`CSV converted to JSON: ${jsonFilePath}`);
    } catch (error) {
      console.error('Error converting CSV to JSON:', error);
      throw error;
    }
  }

  /**
   * Convert JSON to CSV format
   */
  static async jsonToCSV(
    jsonFilePath: string,
    csvFilePath: string,
    delimiter: string = ','
  ): Promise<void> {
    try {
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
      const data = JSON.parse(jsonContent);
      
      if (!Array.isArray(data)) {
        throw new Error('JSON file must contain an array of objects');
      }
      
      await this.writeCSVFile(data, csvFilePath, delimiter);
      console.log(`JSON converted to CSV: ${csvFilePath}`);
    } catch (error) {
      console.error('Error converting JSON to CSV:', error);
      throw error;
    }
  }

  /**
   * Read CSV with data type conversion
   */
  static async readCSVWithTypes(
    filePath: string,
    typeMapping: Record<string, 'string' | 'number' | 'date' | 'boolean'>,
    delimiter: string = ','
  ): Promise<any[]> {
    const data = await this.readCSVFile(filePath, delimiter);
    
    return data.map(row => {
      const convertedRow: any = {};
      
      Object.keys(row).forEach(key => {
        const value = row[key];
        const type = typeMapping[key];
        
        switch (type) {
          case 'number':
            convertedRow[key] = value ? Number(value) : 0;
            break;
          case 'boolean':
            convertedRow[key] = value?.toLowerCase() === 'true' || value === '1';
            break;
          case 'date':
            convertedRow[key] = value ? new Date(value) : null;
            break;
          default:
            convertedRow[key] = value || '';
        }
      });
      
      return convertedRow;
    });
  }

  /**
   * Get CSV file statistics
   */
  static getCSVStats(filePath: string, delimiter: string = ','): {
    totalRows: number;
    totalColumns: number;
    headers: string[];
    fileSize: string;
  } {
    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      
      const headers = lines.length > 0 
        ? this.parseCSVLine(lines[0], delimiter).map(h => h.trim())
        : [];
      
      return {
        totalRows: Math.max(0, lines.length - 1), // Exclude header row
        totalColumns: headers.length,
        headers,
        fileSize: `${(stats.size / 1024).toFixed(2)} KB`
      };
    } catch (error) {
      console.error('Error getting CSV stats:', error);
      return {
        totalRows: 0,
        totalColumns: 0,
        headers: [],
        fileSize: '0 KB'
      };
    }
  }
}
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Excel Reader Utility - Read and write Excel files for test data
 */
export class ExcelReader {
  
  /**
   * Read Excel file and return data as array of objects
   */
  static async readExcelFile(filePath: string, sheetName?: string): Promise<any[]> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Excel file not found: ${filePath}`);
      }

      const workbook = XLSX.readFile(filePath);
      const sheet = sheetName || workbook.SheetNames[0];
      
      if (!workbook.Sheets[sheet]) {
        throw new Error(`Sheet '${sheet}' not found in Excel file`);
      }

      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      return data;
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw error;
    }
  }

  /**
   * Read specific columns from Excel file
   */
  static async readExcelColumns(
    filePath: string, 
    columns: string[], 
    sheetName?: string
  ): Promise<any[]> {
    const data = await this.readExcelFile(filePath, sheetName);
    
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
   * Read Excel file and filter by criteria
   */
  static async readExcelWithFilter(
    filePath: string,
    filterFn: (row: any) => boolean,
    sheetName?: string
  ): Promise<any[]> {
    const data = await this.readExcelFile(filePath, sheetName);
    return data.filter(filterFn);
  }

  /**
   * Write data to Excel file
   */
  static async writeExcelFile(
    data: any[],
    filePath: string,
    sheetName: string = 'Sheet1'
  ): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      XLSX.writeFile(workbook, filePath);
      console.log(`Excel file written successfully: ${filePath}`);
    } catch (error) {
      console.error('Error writing Excel file:', error);
      throw error;
    }
  }

  /**
   * Get all sheet names from Excel file
   */
  static getSheetNames(filePath: string): string[] {
    try {
      const workbook = XLSX.readFile(filePath);
      return workbook.SheetNames;
    } catch (error) {
      console.error('Error reading Excel sheet names:', error);
      throw error;
    }
  }

  /**
   * Read test credentials from Excel file
   */
  static async readTestCredentials(filePath: string): Promise<any[]> {
    try {
      const data = await this.readExcelFile(filePath);
      return data;
    } catch (error) {
      console.error('Error reading test credentials from Excel:', error);
      throw error;
    }
  }

  /**
   * Read slot booking test data from Excel
   */
  static async readSlotBookingData(
    filePath: string,
    sheetName: string = 'SlotData'
  ): Promise<any[]> {
    return await this.readExcelFile(filePath, sheetName);
  }

  /**
   * Create sample Excel file with test data structure
   */
  static async createSampleExcelFile(filePath: string): Promise<void> {
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

    await this.writeExcelFile(sampleData, filePath, 'TestCredentials');
    
    // Add slot booking data sheet
    const slotData = [
      {
        slotId: 'SLOT_001',
        date: '2025-11-05',
        time: '10:00',
        duration: 60,
        trainer: 'John Trainer',
        capacity: 10,
        type: 'Fitness'
      },
      {
        slotId: 'SLOT_002',
        date: '2025-11-05',
        time: '14:00',
        duration: 45,
        trainer: 'Jane Trainer',
        capacity: 15,
        type: 'Yoga'
      }
    ];

    // Read existing workbook and add new sheet
    const workbook = XLSX.readFile(filePath);
    const slotWorksheet = XLSX.utils.json_to_sheet(slotData);
    XLSX.utils.book_append_sheet(workbook, slotWorksheet, 'SlotData');
    XLSX.writeFile(workbook, filePath);
    
    console.log(`Sample Excel file created: ${filePath}`);
  }

  /**
   * Validate Excel file structure
   */
  static validateExcelStructure(
    filePath: string,
    requiredColumns: string[],
    sheetName?: string
  ): { isValid: boolean; missingColumns: string[] } {
    try {
      const data = XLSX.readFile(filePath);
      const sheet = sheetName || data.SheetNames[0];
      const worksheet = data.Sheets[sheet];
      
      if (!worksheet) {
        return { isValid: false, missingColumns: requiredColumns };
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData[0] as string[];
      
      const missingColumns = requiredColumns.filter(col => 
        !headers.includes(col)
      );
      
      return {
        isValid: missingColumns.length === 0,
        missingColumns
      };
    } catch (error) {
      console.error('Error validating Excel structure:', error);
      return { isValid: false, missingColumns: requiredColumns };
    }
  }

  /**
   * Convert Excel date serial number to JavaScript Date
   */
  static convertExcelDate(excelDate: number): Date {
    return new Date((excelDate - 25569) * 86400 * 1000);
  }

  /**
   * Read Excel file with data type conversion
   */
  static async readExcelWithTypes(
    filePath: string,
    typeMapping: Record<string, 'string' | 'number' | 'date' | 'boolean'>,
    sheetName?: string
  ): Promise<any[]> {
    const data = await this.readExcelFile(filePath, sheetName);
    
    return data.map(row => {
      const convertedRow: any = {};
      
      Object.keys(row).forEach(key => {
        const value = row[key];
        const type = typeMapping[key];
        
        switch (type) {
          case 'number':
            convertedRow[key] = Number(value);
            break;
          case 'boolean':
            convertedRow[key] = Boolean(value);
            break;
          case 'date':
            convertedRow[key] = typeof value === 'number' 
              ? this.convertExcelDate(value)
              : new Date(value);
            break;
          default:
            convertedRow[key] = String(value);
        }
      });
      
      return convertedRow;
    });
  }
}
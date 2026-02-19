// Data Utilities Export Index
export { DataGenerator } from './data-generator';
export { ExcelReader } from './excel-reader';
export { CSVReader } from './csv-reader';

/**
 * Utility class to work with all data formats
 */
export class DataUtils {
  
  /**
   * Create sample test data files for the project
   */
  static async createSampleFiles(outputDir: string = './test-data'): Promise<void> {
    const { DataGenerator } = await import('./data-generator');
    const { ExcelReader } = await import('./excel-reader');
    const { CSVReader } = await import('./csv-reader');
    
    try {
      // Create sample Excel file
      await ExcelReader.createSampleExcelFile(`${outputDir}/sample-data.xlsx`);
      
      // Create sample CSV file
      await CSVReader.createSampleCSVFile(`${outputDir}/sample-data.csv`);
      
      // Generate multiple test users
      const testUsers = DataGenerator.generateMultipleRecords(
        () => DataGenerator.generateUserData(),
        5
      );
      
      // Write generated users to CSV
      await CSVReader.writeCSVFile(testUsers, `${outputDir}/generated-users.csv`);
      
      // Generate slot booking data
      const slotData = DataGenerator.generateMultipleRecords(
        () => DataGenerator.generateSlotData(),
        10
      );
      
      // Write slot data to CSV
      await CSVReader.writeCSVFile(slotData, `${outputDir}/slot-bookings.csv`);
      
      console.log('✅ Sample data files created successfully!');
      console.log(`📁 Files created in: ${outputDir}`);
      console.log('   - sample-data.xlsx');
      console.log('   - sample-data.csv');
      console.log('   - generated-users.csv');
      console.log('   - slot-bookings.csv');
      
    } catch (error) {
      console.error('❌ Error creating sample files:', error);
      throw error;
    }
  }

  /**
   * Validate test data file structure
   */
  static validateTestDataFiles(testDataDir: string = './test-data'): {
    excel: { isValid: boolean; missingColumns: string[] };
    csv: { isValid: boolean; missingColumns: string[] };
  } {
    const { ExcelReader } = require('./excel-reader');
    const { CSVReader } = require('./csv-reader');
    
    const requiredColumns = ['username', 'password', 'role', 'firstName', 'lastName'];
    
    return {
      excel: ExcelReader.validateExcelStructure(
        `${testDataDir}/sample-data.xlsx`,
        requiredColumns
      ),
      csv: CSVReader.validateCSVStructure(
        `${testDataDir}/sample-data.csv`,
        requiredColumns
      )
    };
  }
}
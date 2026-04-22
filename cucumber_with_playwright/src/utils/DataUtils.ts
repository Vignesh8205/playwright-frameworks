/**
 * DataUtils - Utility class for generating random test data
 */
export class DataUtils {
    /**
     * Generates a random alphanumeric string of specified length
     */
    static generateRandomString(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generates a random numeric string of specified length
     */
    static generateRandomNumber(length: number): string {
        const chars = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Generates a random VAT number (example: 9 digits)
     */
    static generateVATNumber(): string {
        return 'GB' + this.generateRandomNumber(9);
    }

    /**
     * Generates a random FRN number (6 or 7 digits)
     */
    static generateFRNNumber(): string {
        return this.generateRandomNumber(7);
    }

    /**
     * Generates a random Company Number (8 alphanumeric characters)
     */
    static generateCompanyNumber(): string {
        return this.generateRandomString(8).toUpperCase();
    }

    /**
     * Generates a random UK Telephone number
     */
    static generateTelephone(): string {
        return '07' + this.generateRandomNumber(9);
    }

    /**
     * Generates a random Website URL
     */
    static generateWebsite(): string {
        return `https://www.${this.generateRandomString(8).toLowerCase()}.com`;
    }
}

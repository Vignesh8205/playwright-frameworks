/**
 * Data Generator Utility - Generate test data for various scenarios
 */
export class DataGenerator {
  
  /**
   * Generate random email addresses
   */
  static generateEmail(domain: string = "test.com"): string {
    const username = this.generateRandomString(8).toLowerCase();
    return `${username}@${domain}`;
  }

  /**
   * Generate random string with specified length
   */
  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random numbers within range
   */
  static generateRandomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random phone numbers
   */
  static generatePhoneNumber(format: 'US' | 'UK' | 'IN' = 'US'): string {
    switch (format) {
      case 'US':
        return `+1${this.generateRandomNumber(2000000000, 9999999999)}`;
      case 'UK':
        return `+44${this.generateRandomNumber(1000000000, 9999999999)}`;
      case 'IN':
        return `+91${this.generateRandomNumber(6000000000, 9999999999)}`;
      default:
        return `+1${this.generateRandomNumber(2000000000, 9999999999)}`;
    }
  }

  /**
   * Generate random names
   */
  static generateRandomName(type: 'first' | 'last' | 'full' = 'full'): string {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Chris', 'Emma',
      'Robert', 'Maria', 'James', 'Anna', 'William', 'Jessica', 'Thomas', 'Ashley'
    ];
    
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Taylor'
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    switch (type) {
      case 'first':
        return firstName;
      case 'last':
        return lastName;
      case 'full':
        return `${firstName} ${lastName}`;
      default:
        return `${firstName} ${lastName}`;
    }
  }

  /**
   * Generate random dates
   */
  static generateRandomDate(
    startDate: Date = new Date('2020-01-01'),
    endDate: Date = new Date()
  ): string {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().split('T')[0];
  }

  /**
   * Generate random addresses
   */
  static generateRandomAddress(): {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } {
    const streets = [
      'Main St', 'Oak Ave', 'Pine St', 'Maple Dr', 'Cedar Ln', 'Elm St',
      'Park Ave', 'First St', 'Second St', 'Broadway', 'Washington St'
    ];

    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
      'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'
    ];

    const states = [
      'CA', 'NY', 'TX', 'FL', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'AZ', 'WA'
    ];

    return {
      street: `${this.generateRandomNumber(1, 9999)} ${streets[Math.floor(Math.random() * streets.length)]}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zipCode: this.generateRandomNumber(10000, 99999).toString(),
      country: 'USA'
    };
  }

  /**
   * Generate test user data for slot booking app
   */
  static generateUserData(): {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  } {
    const firstName = this.generateRandomName('first');
    const lastName = this.generateRandomName('last');
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@slotbooking.test`;
    
    return {
      email,
      password: this.generateRandomString(12),
      firstName,
      lastName,
      phone: this.generatePhoneNumber('US')
    };
  }

  /**
   * Generate slot booking test data
   */
  static generateSlotData(): {
    slotId: string;
    date: string;
    time: string;
    duration: number;
    instructor: string;
    capacity: number;
    type: string;
  } {
    const slotTypes = ['Fitness', 'Yoga', 'Swimming', 'Boxing', 'Dance', 'Pilates'];
    const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    
    return {
      slotId: `SLOT_${this.generateRandomString(6).toUpperCase()}`,
      date: this.generateRandomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      time: times[Math.floor(Math.random() * times.length)],
      duration: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
      instructor: this.generateRandomName('full'),
      capacity: this.generateRandomNumber(5, 20),
      type: slotTypes[Math.floor(Math.random() * slotTypes.length)]
    };
  }

  /**
   * Generate multiple test records
   */
  static generateMultipleRecords<T>(
    generator: () => T,
    count: number
  ): T[] {
    return Array.from({ length: count }, () => generator());
  }

  /**
   * Generate random boolean
   */
  static generateRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Generate random UUID-like string
   */
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generate test credentials for different environments
   */
  static generateTestCredentials(environment: 'dev' | 'qa' | 'staging' = 'dev') {
    const count = 3;
    return Array.from({ length: count }, (_, i) => ({
      username: `user${i + 1}.${environment}@slotbooking.test`,
      password: `User${i + 1}${environment.toUpperCase()}123!`
    }));
  }
}
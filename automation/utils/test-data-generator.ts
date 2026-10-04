export class TestDataGenerator {
  static generateEmail(prefix: string = 'qa_user'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}_${timestamp}_${random}@nopqa.local`;
  }

  static generateUser(overrides: Partial<{ firstName: string; lastName: string; company: string }> = {}) {
    const email = this.generateEmail();
    return {
      gender: 'M' as const,
      firstName: overrides.firstName || 'Test',
      lastName: overrides.lastName || 'User',
      email: email,
      password: 'TestPassword123!',
      company: overrides.company || 'QA Automation Labs'
    };
  }

  static generateAddress() {
    const random = Math.floor(Math.random() * 900) + 100;
    return {
      firstName: 'Automation',
      lastName: 'Tester',
      email: this.generateEmail('shipping'),
      city: 'Rochester',
      address1: `${random} Innovation Way`,
      zip: '14623',
      phone: '5855550144'
    };
  }
}

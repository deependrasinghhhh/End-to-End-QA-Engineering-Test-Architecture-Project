import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface BillingAddressInput {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
}

export class CheckoutPage extends BasePage {
  // Accordion Steps
  readonly billingStep: Locator;
  readonly shippingStep: Locator;
  readonly shippingMethodStep: Locator;
  readonly paymentMethodStep: Locator;
  readonly paymentInfoStep: Locator;
  readonly confirmOrderStep: Locator;

  // Billing Fields
  readonly billingFirstName: Locator;
  readonly billingLastName: Locator;
  readonly billingEmail: Locator;
  readonly billingCity: Locator;
  readonly billingAddress1: Locator;
  readonly billingZip: Locator;
  readonly billingPhone: Locator;
  readonly billingContinueBtn: Locator;

  // Shipping & Method Fields
  readonly pickupInStoreCheckbox: Locator;
  readonly shippingContinueBtn: Locator;
  readonly groundShippingRadio: Locator;
  readonly nextDayAirShippingRadio: Locator;
  readonly shippingMethodContinueBtn: Locator;

  // Payment Fields
  readonly checkMoneyOrderRadio: Locator;
  readonly creditCardRadio: Locator;
  readonly paymentMethodContinueBtn: Locator;
  readonly paymentInfoContinueBtn: Locator;

  // Confirm Order Fields
  readonly confirmOrderButton: Locator;
  readonly orderTotalReview: Locator;

  // Order Completed Elements
  readonly orderCompletedTitle: Locator;
  readonly orderNumberText: Locator;
  readonly orderDetailsLink: Locator;
  readonly completedContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.billingStep = page.locator('#opc-billing');
    this.shippingStep = page.locator('#opc-shipping');
    this.shippingMethodStep = page.locator('#opc-shipping_method');
    this.paymentMethodStep = page.locator('#opc-payment_method');
    this.paymentInfoStep = page.locator('#opc-payment_info');
    this.confirmOrderStep = page.locator('#opc-confirm_order');

    this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = page.locator('#BillingNewAddress_LastName');
    this.billingEmail = page.locator('#BillingNewAddress_Email');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueBtn = page.locator('#billing-buttons-container button');

    this.pickupInStoreCheckbox = page.locator('#PickUpInStore');
    this.shippingContinueBtn = page.locator('#shipping-buttons-container button');
    this.groundShippingRadio = page.locator('#shippingoption_0');
    this.nextDayAirShippingRadio = page.locator('#shippingoption_1');
    this.shippingMethodContinueBtn = page.locator('#shipping-method-buttons-container button');

    this.checkMoneyOrderRadio = page.locator('#paymentmethod_0');
    this.creditCardRadio = page.locator('#paymentmethod_1');
    this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container button');
    this.paymentInfoContinueBtn = page.locator('#payment-info-buttons-container button');

    this.confirmOrderButton = page.locator('#confirm-order-buttons-container button');
    this.orderTotalReview = page.locator('.cart-total-right strong');

    this.orderCompletedTitle = page.locator('.section.order-completed .title');
    this.orderNumberText = page.locator('.order-number strong');
    this.orderDetailsLink = page.locator('.order-details-link');
    this.completedContinueButton = page.locator('.order-completed-continue-button');
  }

  async open(): Promise<void> {
    await this.navigate('/checkout');
  }

  async fillBillingAddress(data?: BillingAddressInput): Promise<void> {
    if (data) {
      await this.billingFirstName.fill(data.firstName);
      await this.billingLastName.fill(data.lastName);
      await this.billingEmail.fill(data.email);
      await this.billingCity.fill(data.city);
      await this.billingAddress1.fill(data.address1);
      await this.billingZip.fill(data.zip);
      await this.billingPhone.fill(data.phone);
    }
    await this.billingContinueBtn.click();
  }

  async selectShippingAddress(): Promise<void> {
    await this.shippingContinueBtn.click();
  }

  async selectShippingMethod(method: 'Ground' | 'NextDayAir' = 'Ground'): Promise<void> {
    if (method === 'NextDayAir') {
      await this.nextDayAirShippingRadio.check();
    } else {
      await this.groundShippingRadio.check();
    }
    await this.shippingMethodContinueBtn.click();
  }

  async selectPaymentMethod(method: 'Check' | 'CreditCard' = 'Check'): Promise<void> {
    if (method === 'CreditCard') {
      await this.creditCardRadio.check();
    } else {
      await this.checkMoneyOrderRadio.check();
    }
    await this.paymentMethodContinueBtn.click();
  }

  async confirmPaymentInfo(): Promise<void> {
    await this.paymentInfoContinueBtn.click();
  }

  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }

  async completeFullCheckout(): Promise<void> {
    await this.fillBillingAddress();
    await this.selectShippingAddress();
    await this.selectShippingMethod();
    await this.selectPaymentMethod();
    await this.confirmPaymentInfo();
    await this.confirmOrder();
  }

  async getConfirmedOrderNumber(): Promise<string> {
    return (await this.orderNumberText.innerText()).trim();
  }
}

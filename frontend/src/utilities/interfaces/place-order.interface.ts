export interface IPlaceOrder {
    customerName: string;
    firstName: string;
    lastName: string;
    deliveryChannel: 'api' | 'email' | 'sms';
}
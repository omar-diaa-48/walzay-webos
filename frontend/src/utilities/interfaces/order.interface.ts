interface ILineItem {
    lineNumber: number;
    cardItemId: string;
    value: string;
    status: string;
    statusDescription: string;
    claimURL: string;
    settlementCurrency: string;
    exchangeRate: string;
    settlementPrice: string;
    netPrice: string;
}

interface IOrder {
    id: string;
    customerName: string;
    deliveryChannel: string;
    emailAddress: string;
    smsMobileNumber: string;
    referenceNo: string;
    creationDate: string;
    placementDate: string;
    lineItems: ILineItem[];
}

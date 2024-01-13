interface IUser {
    token: string;
    fullName: string;
    organization: string;
    expireDate: string;
    privileges: string[];
    configurations: {
        placeOrder: {
            referenceNo: string;
        };
    };
}
import * as yup from 'yup';

const schema = yup.object().shape({
    customerName: yup.string().label('Customer Name').required(),
    firstName: yup.string().label('First Name').optional(),
    lastName: yup.string().label('Last Name').optional(),
    deliveryChannel: yup.string().label('Delivery Channel').oneOf(['api', 'email', 'sms']).required(),
    emailAddress: yup.string().label('Email Address').optional()
        .when('deliveryChannel', {
            is: 'email',
            then(schema) {
                return schema.required().email('Invalid email address');
            },
        }),
    smsMobileNumber: yup.string().label('Sms Mobile Number').optional()
        .when('deliveryChannel', {
            is: 'sms',
            then(schema) {
                return schema.required().matches(/^\+\d{ 12}$/, { message: 'Invalid sms mobile number' });
            },
        }),
});

export default schema
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().label('First Name').required(),
    lastName: yup.string().label('Last Name').required(),
    customerName: yup.string().label('Customer Name').required(),
    deliveryChannel: yup.string().label('Delivery Channel').oneOf(['api', 'email', 'sms']).required(),
    emailAddress: yup.string().label('Email Address').required(),
    smsMobileNumber: yup.string().label('Sms Mobile Number').required(),
});

export default schema
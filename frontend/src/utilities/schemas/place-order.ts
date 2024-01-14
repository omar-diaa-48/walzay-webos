import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().label('First Name').required(),
    lastName: yup.string().label('Last Name').required(),
    customerName: yup.string().label('Customer Name').required(),
});

export default schema
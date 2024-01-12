import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().label('Username').required(),
    password: yup.string().label('Password').min(8).max(30).required(),
});

export default schema
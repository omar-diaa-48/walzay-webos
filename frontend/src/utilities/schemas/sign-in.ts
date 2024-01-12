import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    password: yup.string().label('Password').min(8).max(30).required(),
});

export default schema
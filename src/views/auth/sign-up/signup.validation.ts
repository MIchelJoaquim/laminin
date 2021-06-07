import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatorio").min(4, "O nome deve ter um minimo de 4 caracteres"),
    email: yup.string().email().required("O e-mail é obrigatorio"),
    password: yup.string().required("A palavra passe é obrigatoria").min(4, "A sua palavra passe deve ter um minimo de 4 caracteres"),
    passwordconfirmation: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Palavra passe de confirmação errada')
});
export default schema;
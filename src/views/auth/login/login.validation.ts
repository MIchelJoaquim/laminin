import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email().required("O e-mail é obrigatorio"),
    password: yup.string().required("A palavra passe é obrigatoria").min(4, "A sua palavra passe deve ter um minimo de 4 caracteres"),
});
export default schema;
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required("O nome do mercado é obrigatoria").min(4, "O nome do mercado deve ter um minimo de 4 caracteres"),
});
export default schema;
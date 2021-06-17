import * as yup from 'yup';

const schema = yup.object().shape({
    market: yup
        .string()
        .transform(value => value.trim()),
    product: yup.string().required("O nome do produto é obrigatório").transform(value => value.trim()),
    price: yup.number().required("O preço do produto é obrigatório").min(100, "O preço do produto deve se superior a 100 AO")
});
export default schema;
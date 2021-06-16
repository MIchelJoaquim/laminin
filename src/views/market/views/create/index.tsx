import { FC } from 'react';
import { Grid , Button, TextField} from "@material-ui/core"
import SnackbarView from './../../../../components/snackbar-view/index';
import { useForm } from 'react-hook-form';
import useAsyncState from '../../../../hooks/use-async-state';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMarketFormData } from './create-market.types';
import schema from './create-market.validation';
import { createMarket } from '../../../../services/market';

const CreateMarket: FC = () => {
    const { setSnackMessage, snackMessage } = useAsyncState()
    const { register, handleSubmit, errors } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit<IMarketFormData>((data) =>
    {
        createMarket(data)
        .then(res =>{
            setSnackMessage({message: "Mercado cadastrado com sucesso!", isError: false});
        })
        .catch(error => {
            setSnackMessage({message: "Lamentamos, ocorreu um erro ao cadastrar o mercado!", isError: true});
        });
    }
)

    return (<form onSubmit={onSubmit}>
        <SnackbarView
          snackMessage={snackMessage}
          onClose={() => {
            setSnackMessage(null)
          }}
        />
        <Grid container >
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Nome do mercado"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              inputRef={register}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Salvar
            </Button>
          </Grid>
          
        </Grid>
      </form>);
}

export default CreateMarket;
import { FC, useState, useEffect, ChangeEvent } from "react"
import { Grid, Button, TextField } from "@material-ui/core"
import SnackbarView from "./../../../../components/snackbar-view/index"
import { useForm } from "react-hook-form"
import useAsyncState from "../../../../hooks/use-async-state"
import { yupResolver } from "@hookform/resolvers/yup"
import { IHistoricFormData } from "./historic.types"
import schema from "./historic.validation"
import { createHistoric } from "../../../../services/historic"
import {  FormControl, Select, InputLabel } from "@material-ui/core"
import { IMarket } from "./../../../../types/market"
import useStyles from "./create-historic.styles"
import { getAllMarket } from "./../../../../services/market/index"

const CreateHistoric: FC = () => {
  const classes = useStyles()
  const { setSnackMessage, snackMessage } = useAsyncState()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const [markets, setMarkets] = useState<IMarket[] | []>([])
  const [market, setMarket] = useState<string>("")

  useEffect(() => {
    getAllMarket().then(({ data }) => {
      const markets = data?.payload.data
      if (markets) {
        setMarkets(markets as any)
      }
    })
  }, [])

  const handleMarketSelect = (e: ChangeEvent<{ value: unknown }>) => {
    setMarket(e.target.value as string)
  }

  const onSubmit = handleSubmit<IHistoricFormData>((data) => {
    const dataSend = {
      marketId: market,
      productName: data.product,
      productPrice: data.price,
    }
    createHistoric(dataSend)
      .then(() => {
        setSnackMessage({
          message: "Histórico cadastrado com sucesso!",
          isError: false,
        })
      })
      .catch(() => {
        setSnackMessage({
          message: "Lamentamos, ocorreu um erro ao cadastrar o Histórico!",
          isError: true,
        })
      })
  })

  return (
    <form onSubmit={onSubmit}>
      <SnackbarView
        snackMessage={snackMessage}
        onClose={() => {
          setSnackMessage(null)
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
         
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-native-simple">
              {errors.market ? errors.market.message : 'Mercados'}
            </InputLabel>
            <Select
              native
              value={market}
              onChange={handleMarketSelect}
              label="Mercados"
              inputProps={{
                name: "market",
                id: "outlined-native-simple",
              }}
            > 
            <option value="" ></option>
              {markets.map((markett) => (
                    <option value={markett.id} key={markett.id}>
                      {markett.name}
                    </option>
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="Nome do produto"
            variant="outlined"
            fullWidth
            margin="normal"
            name="product"
            inputRef={register}
            error={!!errors.product}
            helperText={errors.product?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="Preço do produto"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            defaultValue="0"
            inputRef={register}
            error={!!errors.price}
            helperText={errors.price?.message}
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
    </form>
  )
}

export default CreateHistoric

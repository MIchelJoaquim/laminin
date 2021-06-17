import { FC, useState, useEffect, ChangeEvent } from "react"
import { useHistory } from "react-router-dom"
import Table from "../../components/table"
import { getAllHistoric } from "../../services/historic"
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core"
import { ROUTES } from "../../constants/routes"
import useStyles from "./historic.styles"
import { IHistoric } from "./../../types/historic"
import { getAllMarket } from "../../services/market"
import { IMarket } from './../../types/market';
import { headCells } from './historic.types';

const Dashboard: FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const [historic, setHistoric] = useState<IHistoric[] | null>(null)
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null)
  const [searchProduct, setSearchProduct] = useState<string>("")
  const [searchMarket, setSearchMarket] = useState<string>("")
  const [markets, setMarkets] = useState<IMarket[] | []>([])

  const handleChangeValue = (value: string) => {
    setSearchProduct(value)
  }

  useEffect(() => {
    getAllMarket().then(({ data }) => {
      const markets = data?.payload.data
      if (markets) {
        setMarkets(markets as any)
      }
    })
  }, [])
  
  const handleMarketSelect = (e: ChangeEvent<{ value: unknown }>) => {
    setSearchMarket(e.target.value as string)
  }

  useEffect(() => {
    getAllHistoric(searchProduct, searchMarket).then(({ data }) => {
      const markets = data?.payload.data
      if (markets) {
        setHistoric(markets as any)
      }
    })
  }, [searchProduct, searchMarket])

  useEffect(() => {
    const newValue = historic?.map((item) => ({
      ...item,
      market: item.market.name,
      price: item.productPrice + " AOA/Kg",
      product: item.productName,
    }))

    setRows(newValue as any)
  }, [historic])

  return (
    <>
      <Grid container className={classes.header} spacing={2}>
        <Grid item sm={12} >
          <h1>Histórico de preços</h1>
        </Grid>
        
        <Grid sm={12} md={6}>
          <div style={{  marginRight: '24px', marginTop: '8px'}}>
            <TextField
              variant="outlined"
              label="Pesquisa"
              name="name"
              style={{ flex: 1, marginRight: '64px', width: "100%" }}
              onChange={(event) =>
                handleChangeValue(event.target.value as string)
              }
            />
          </div>
        </Grid>
        <Grid sm={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-native-simple">
                Mercados
              </InputLabel>
              <Select
                native
                value={searchMarket}
                onChange={handleMarketSelect}
                label="Mercados"
                inputProps={{
                  name: "market",
                  id: "outlined-native-simple",
                }}
              > 
              <option value="" ></option>
                {markets.map((markett) => (
                      <option value={markett.name} key={markett.id}>
                        {markett.name}
                      </option>
                    ))}
              </Select>
            </FormControl>
        </Grid>
        <Grid item sm={12} md={2} className={classes.containerButton}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push(ROUTES.HISTORIC_CREATE)}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>

      <Table headCells={headCells} rows={rows} />
    </>
  )
}

export default Dashboard

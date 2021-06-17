import { FC, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Table from "../../components/table"
import { HeadCell } from "../../components/table/table.types"
import { getAllHistoric } from "../../services/historic"
import { Grid, Button } from "@material-ui/core"
import { ROUTES } from '../../constants/routes';
import useStyles from "./historic.styles"
import { IHistoric } from './../../types/historic';

const Dashboard: FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const [historic, setHistoric] = useState<IHistoric[] | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null)
  const headCells: HeadCell[] = [
    { label: "Mercado", id: "market" },
    { label: "Produto", id: "product" },
    { label: "Preço", id: "price" },
  ]

  useEffect(() => {
    getAllHistoric().then(({ data }) => {
      const markets = data?.payload.data
      if (markets) {
        setHistoric(markets as any)
      }
    })
  }, [])

  useEffect(()=> {
    const newValue =historic?.map(item => ({
      ...item,
      market: item.market.name,
      price: item.productPrice + " AOA/Kg",
      product: item.productName
    }));

    setRows(newValue as any);

  }, [historic]);

  return (
    <>
      <Grid container className={classes.header}>
        <Grid item sm={12} md={6}>
          <h1>Histórico de preços</h1>
        </Grid>
        <Grid item sm={12} md={6} className={classes.containerButton}>
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

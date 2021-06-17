import { FC, useEffect, useState } from 'react';
import Table from "../../components/table";
import { HeadCell } from '../../components/table/table.types';
import { getAllMarket } from './../../services/market/index';
import { Grid, Button } from '@material-ui/core';
import useStyles from './market.styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
const Market: FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);
    const headCells: HeadCell[] = [
        {label: "#", id: "id"}, 
        {label: "Name", id: "name"}, 
    ];

    useEffect(()=>{
        getAllMarket().then(({data}) => {
            const markets = data?.payload.data;
            if(markets){setRows(markets as any);}
        });
        
    }, []);

    
    return (
        <>
            <Grid container className={classes.header}>
                <Grid item sm={12} md={6}>

                    <h1>Mercados disponíveis</h1> 
                </Grid>
                <Grid item sm={12} md={6} className={classes.containerButton}>

                    <Button color="primary" variant="contained" onClick={()=> history.push(ROUTES.MARKET_CREATE)}>Adicionar</Button>
                </Grid>
            </Grid>

            <Table headCells={headCells} rows={rows} />
        </>
    );
}

export default Market;
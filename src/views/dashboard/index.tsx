import { Button } from "@material-ui/core";
import { FC, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { AuthContextData } from './../../context/auth';

const Dashboard: FC = ()=>{
    const { handleLogout } = useContext(AuthContext) as AuthContextData;
    return (
    <>
        <h1>DASHBOARD</h1>
        <Button onClick={handleLogout}>sair</Button>
    </>
    )
}

export default Dashboard;
import { FC } from "react"
import "./auth-layout.css"
import Container from "@material-ui/core/Container"
import Grid from '@material-ui/core/Grid';

const AuthLayout: FC = ({ children }) => {
  return (
    <Container className="root">
      <img src="http://localhost:3000/laminin.png" alt="logo" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default AuthLayout

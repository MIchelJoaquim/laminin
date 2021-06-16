import { FC, useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./login.validation"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { Grid } from "@material-ui/core"
import useStyles from "./login.styles"
import { LoginFormData } from "./login.types"
import { ICredential } from "./../../../types/credential"
import useAsyncState from "../../../hooks/use-async-state"
import SnackbarView from "./../../../components/snackbar-view/index"
import AuthLayout from "./../../../components/auth-layout/index"
import { useHistory } from "react-router-dom";
import { AuthContext, AuthContextData } from "../../../context/auth"
import { ROUTES } from "../../../constants/routes"

const Login: FC = () => {
  const { handleLogin } = useContext(AuthContext) as AuthContextData;

  const classes = useStyles()
  const { setSnackMessage, snackMessage } = useAsyncState()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const history = useHistory();

  const onSubmit = handleSubmit<LoginFormData>((data: ICredential) =>
      {
        try {
          handleLogin(data)
          .then(res => { setSnackMessage({ message: "Login feito com sucesso!", isError: false })})
          .catch(error => { setSnackMessage({ message: error.message, isError: true })});
        } catch (error) {
          setSnackMessage({ message: "lamentamos ocorreu algum erro, por favor tente novamente!", isError: true });
        }
        
      }
  )

  const onRegister = () => {
    history.push(ROUTES.REGISTER);
  }
  

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <SnackbarView
          snackMessage={snackMessage}
          onClose={() => {
            setSnackMessage(null)
          }}
        />
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              inputRef={register}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              label="Palavra passe"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              inputRef={register}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
              className={classes.button}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              size="large"
              className={classes.button}
              onClick={onRegister}
            >
              Registrar-se
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default Login

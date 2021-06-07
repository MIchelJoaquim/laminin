import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./login.validation"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { Grid } from "@material-ui/core"
import useStyles from "./login.styles"
import { LoginFormData } from "./login.types"
import { authLogin } from "../../../services/auth"
import { ICredential } from "./../../../types/credential"
import useAsyncState from "../../../hooks/use-async-state"
import SnackbarView from "./../../../components/snackbar-view/index"
import AuthLayout from "./../../../components/auth-layout/index"
import { useHistory } from "react-router-dom";

const Login: FC = () => {
  const classes = useStyles()
  const { setSnackMessage, snackMessage } = useAsyncState()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const history = useHistory();

  const onSubmit = handleSubmit<LoginFormData>((data: ICredential) =>
    authLogin(data)
      .then((res) => {
        setSnackMessage({ message: "Login feito com sucesso!", isError: false })
      })
      .catch((error) => {
        setSnackMessage({ message: error.message, isError: true })
      })
  )

  const onRegister = () => {
    history.push("/register");
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

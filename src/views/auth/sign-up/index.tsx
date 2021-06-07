import { FC } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "./signup.validation"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { Grid } from "@material-ui/core"
import useStyles from "./sigup.styles"
import { SignUpFormData } from "./sigup.types"
import { authSignUp } from "../../../services/auth"
import useAsyncState from "../../../hooks/use-async-state"
import SnackbarView from "./../../../components/snackbar-view/index"
import AuthLayout from "./../../../components/auth-layout/index"
import { useHistory } from "react-router-dom"

const SignUp: FC = () => {
  const classes = useStyles()
  const { setSnackMessage, snackMessage } = useAsyncState()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const history = useHistory()

  const onSubmit = handleSubmit<SignUpFormData>((data) => {
    const dataSend = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    authSignUp(dataSend)
      .then((res) => {
        setSnackMessage({
          message: res.data?.msg || "Consultor cadastrado com sucesso!",
          isError: false,
        })
      })
      .catch((error) => {
        setSnackMessage({ message: error.message, isError: true })
      })
  })

  const onLogin = () => {
    history.push("/login")
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
              type="text"
              label="Nome"
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
            <TextField
              type="password"
              label="Confirme a Palavra passe"
              variant="outlined"
              fullWidth
              margin="normal"
              name="passwordconfirmation"
              inputRef={register}
              error={!!errors.passwordconfirmation}
              helperText={errors.passwordconfirmation?.message}
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
              SALVAR
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              size="large"
              className={classes.button}
              onClick={onLogin}
            >
              ENTRAR
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default SignUp

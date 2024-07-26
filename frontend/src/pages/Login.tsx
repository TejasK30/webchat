import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { loginuser } from "../client/apiClient"

export interface LoginFormData {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>()

  const mutation = useMutation({
    mutationFn: loginuser,
    onSuccess: () => {
      console.log("success")
    },
    onError: () => {
      console.log("error")
    },
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data)
  })

  return <div>Login</div>
}

export default Login

import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { registerUser } from "@/redux/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"


const initialState = {
  userName:"",
  email:"",
  password:""
}

const AuthRegister = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {toast} = 
  
  const [formData , setFormData] = useState(initialState);

  const onSubmit = (event) =>{
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success) {
        toast.success(data?.payload?.message)
      }else{
        toast.error(data?.payload?.message)
      }
   
  
        navigate("/auth/login")
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
        <p className="mt-2">Already have an account ?
        <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister
"use client"

import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { INITIAL_STATE } from "../consts"
import { Button } from "@/components/ui/button"
import { ValidationErrors, mapValidationErrors } from "@/shared"
import {ISignInForm} from '../types'
import { ValiError, parse } from "valibot"
import { SignInSchema } from "../lib/validation"
import { useRouter } from "next/navigation"
import signIn from "../api/signIn"
import { AxiosError } from "axios"

export function SignInForm() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const {replace} = useRouter()

  async function submitHandler(event: FormEvent) {
    event.preventDefault()
    const signInData = validateForm()
    if (!signInData) return

    try {
      const authData: AuthData = await signIn(signInData)
      localStorage.setItem('user', JSON.stringify(authData.payload))
      localStorage.setItem('accessToken', authData.accessToken)
      localStorage.setItem('refreshToken', authData.refreshToken)
  
      setFormData(INITIAL_STATE)
      return replace('/')
    } catch (error: unknown) {
      return alert((error as AxiosError<ApiError>).response?.data.message ?? 'Unexpected error')
    }
  }

  function validateForm():ISignInForm | void {
    try {
      setValidationErrors([])
      return parse(SignInSchema, formData)
    } catch (error: unknown) {
      if (error instanceof ValiError) {
        const messages: string[] = mapValidationErrors<ISignInForm>(SignInSchema, formData)
        return setValidationErrors([...messages])
      }
    }
  }
  
  return (
    <form 
      className="border border-black rounded-md self-center p-2 flex flex-col gap-1"
      onSubmit={submitHandler}
    >
      <strong>Sign In</strong>
      <Input 
        value={formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, email: event.target.value})
        }}
        type="email" placeholder="Your email..."/>
      <Input 
        value={formData.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return setFormData({...formData, password: event.target.value})
        }}
        type="password" placeholder="Your password..."/>
      <Button>Войти</Button>
      <ValidationErrors validationArray={validationErrors}/>
    </form>
  )
}
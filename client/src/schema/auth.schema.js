import {z} from "zod"

export const signUpSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "password must be at least 6 char")
})
export const loginSchema = z.object({
    email:z.string().email("Email is required"),
    password:z.string().min(6, "password must be at least 6 char")
})

export const forgetPasswordSchema = z.object({
    email: z.string().email("Registered email is required")
})
export const resetPasswordSchema = z.object({
    password: z.string().min(6,"password must be at least 6 char")
})
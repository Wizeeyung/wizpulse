"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


//create a new file for this in the lib folder so codes wont get messy
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

export enum FormFieldType {
  INPUT ='input',
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton"
}
 
const PatientForm =() => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
      
    },
  })


  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      console.log("Form values:", values); // Debug log
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      const newUser = await createUser(user);
      console.log("New user created:", newUser); // Debug log
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.error("Error creating user:", error); // Changed to console.error for better error logging
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>

        </section>

        <CustomFormField 
        fieldType={FormFieldType.INPUT} 
        control={form.control}
        name="username"
        label="Full Name"
        placeholder= "John Doe"
        iconSrc = "/assets/icons/user.svg"
        iconAlt="user"
        />

        <CustomFormField 
        fieldType={FormFieldType.INPUT} 
        control={form.control}
        name="email"
        label="Email"
        placeholder= "JohnDoe@gmail.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt="email"
        />

        <CustomFormField 
        fieldType={FormFieldType.PHONE_INPUT} 
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder= "(077) 123-4567"
        />
        
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
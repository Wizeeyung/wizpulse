"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/contants"
import { Label } from "../ui/label"




 
const RegistrationForm =({user}: {user: User}) => {

  console.log(user, 'user')

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
      if (newUser) router.push(`/patients/${newUser.$id}/register`);
      
    } catch (error) {
      console.error("Error creating user:", error); // Changed to console.error for better error logging
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information</h2>
          </div>

          <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT} 
          name="name"
          label="Full Name"
          placeholder= "John Doe"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT} 
          name="email"
          label="Email"
          placeholder= "JohnDoe@gmail.com"
          iconSrc = "/assets/icons/email.svg"
          iconAlt="email"
          />

          <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT} 
          name="phone"
          label="Phone Number"
          placeholder= "(077) 123-4567"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomFormField 
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER} 
            name="birthDate"
            label="Date of Birth"
            placeholder= "JohnDoe@gmail.com"
            iconSrc = "/assets/icons/email.svg"
            iconAlt="dob"
            />

          <CustomFormField 
            control={form.control}
            fieldType={FormFieldType.SKELETON} 
            name="gender"
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                   {GenderOptions.map((option)=>(
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option}/>
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>

                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}


          />
        </div>
        </section>

        

       
        
        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegistrationForm
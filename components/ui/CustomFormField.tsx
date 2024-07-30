"use client"

import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from '../forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//Create custom props
interface CustomProps{
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any)=> React.ReactNode
}

const RenderField = ({field, props}:{field: any; props:CustomProps}) =>{
 const {fieldType, iconSrc, iconAlt, renderSkeleton, placeholder, showTimeSelect, dateFormat} = props;
  
  switch(fieldType){
      case FormFieldType.INPUT:
        return(
          <div className='flex rounded-md border-dark-500 bg-dark-400'>
            {iconSrc && (
              <Image 
              src={iconSrc}
              alt={iconAlt || 'icon'}
              className='ml-2'
              height={24}
              width={24}

              />
            )}

            <FormControl>
              <Input 
              {...field} 
              placeholder={placeholder} 
              className='shad-input border-0'
              
              />
            </FormControl>
          </div>
        )

        case FormFieldType.PHONE_INPUT:
          return(
            <FormControl>
              <PhoneInput 
                defaultCountry='US'
                international
                withCountryCallingCode
                value={field.value as E164Number | undefined} 
                placeholder={placeholder}
                onChange={field.onChange}
                className="input-phone"
              />
            </FormControl>
          )

        case FormFieldType.DATE_PICKER:
          return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
              <Image 
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt='calendar'
                className='ml-2'
              />

              <FormControl>
                <DatePicker 
                  selected={field.value}
                  onChange={(date)=> field.onChange(date)}
                  dateFormat={dateFormat ?? "MM/dd/yyyy"}
                  showTimeSelect={showTimeSelect ?? false}
                  timeInputLabel='Time:'
                  wrapperClassName='date-picker'

                />

              </FormControl>
            </div>
          )

          case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        
          default:
          break;
    }
}

const CustomFormField = (props: CustomProps) => {
  const {control, fieldType, name, label, placeholder, iconSrc, iconAlt} = props
  return (
    <FormField
          control={control}
          name={name}
          render={({ field, fieldState:{error} }) => (
            //we have to render this dynamically cause different input has different options
            <FormItem>
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}

              <RenderField field={field} props={props} />
              {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
          )}
        />
  )
}

export default CustomFormField
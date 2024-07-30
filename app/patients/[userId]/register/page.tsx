import RegistrationForm from '@/components/forms/RegistrationForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({params : {userId} }: SearchParamProps) => {

  const user = await getUser(userId)

  console.log(user, 'user')

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 xl:h-10 w-fit"
          />

          <RegistrationForm user={user}/>
          
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="text-dark-600 xl:text-left">
              © 2024 WizPulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
            Admin
            </Link>
          </div>
        </div>

        
      </section>

      <Image
        src="/assets/images/register-img.png"
        width={1000}
        height={1000}
        alt="hero-image"
        className="hidden md:block h-full opacity-50 object-cover max-w-[390px]"
      />
      
    </div>
  )
}

export default Register
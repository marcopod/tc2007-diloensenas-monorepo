"use client";
import React, { ReactNode, useEffect, useReducer } from 'react'
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/navigation';

type EncapsulationProps = {
    children?: ReactNode;
}

const Encapsulation: React.FC<EncapsulationProps> = ({ children }) => {
    const { data: session, status } = useSession();
    
    async function getServerSideProps() {
        if (!session) {
          return {
            redirect: {
              destination: "/login", // or wherever you want to redirect
              permanent: false,
            },
          };
        }
      
        return {
          props: {},
        };
    }
    useEffect(() => {
        getServerSideProps();
    }, [session])
    return (
        <div>
            {children}
        </div>
    )
}
export default Encapsulation;
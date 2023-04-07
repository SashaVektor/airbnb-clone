"use client"

import { useEffect } from "react"

interface ErrorStateProps {
    error: Error
}

import React from 'react'
import EmptyState from "./components/EmptyState"

const ErrorState: React.FC<ErrorStateProps> = ({error}) => {
    useEffect(() => {
        console.log(error)
    } , [error])
  return (
    <EmptyState 
    title="Uh Oh"
    subtitle="Something went wrong!"
    />
  )
}

export default ErrorState

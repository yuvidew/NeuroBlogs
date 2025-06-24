
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'


export default function AppLayout() {
    const { isLoaded, isSignedIn } = useUser()

    if (!isLoaded) return null; 

    if (!isSignedIn) return <Redirect href="/(auth)/welcome" />

    return <Slot />
}

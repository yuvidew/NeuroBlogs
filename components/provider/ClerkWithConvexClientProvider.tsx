
import React, { ReactNode } from 'react';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { LogBox } from 'react-native';
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";


const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
});

if (!clerkPublishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
}

LogBox.ignoreLogs(['clerk: The `useClerk` hook is not available in the Expo Go app.']);

export const ClerkClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={clerkPublishableKey}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants/icons';
import TabIcon from '../_components/TabIcon';


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    borderTopColor: "#318CE7",
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.homeFocus : icons.home}
                            title="Home"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: "Discover",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.discoverFocus : icons.discover}
                            title="Discover"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="create-blog"
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={icons.plusFocus}
                            size="size-10"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "My Bookmarks",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.saveFocus : icons.save}
                            title="Bookmarks"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.userFocus : icons.user}
                            title="Profile"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;

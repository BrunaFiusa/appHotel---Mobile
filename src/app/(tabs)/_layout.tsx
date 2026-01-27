/*Função: definir o fluxo de navegação entre as telas disponíveis em Tab Navigator:*/

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "../../components/ui/styles";

const RootLayout = () => {
    return (
        <React.Fragment>
            <StatusBar style="auto"/>
            <Tabs screenOptions={{
                tabBarActiveTintColor: "#f9ddffff",
                tabBarInactiveTintColor: "#420350ff",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#824590ff",
                }
            }}>             
                <Tabs.Screen name="explorer" options={{title: 'Pesquisar',tabBarIcon: ({ color }) => (<FontAwesome5 name="search" size={24} color={color} />),}} />
                <Tabs.Screen name="account" options={{ title: 'Minha Conta', tabBarIcon: ({ color }) => (<FontAwesome5 name="user-circle" size={24} color={color} />),}} />
                <Tabs.Screen name="reservation" options={{ title: 'Reservas',tabBarIcon: ({ color }) => (<FontAwesome5 name="briefcase" size={24} color={color} />),}} />
            </Tabs>
        </React.Fragment>
    )
}

export default RootLayout;
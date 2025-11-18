/*Função: definir o fluxo de navegação entre as telas disponíveis em Tab Navigator:*/

import { Tabs } from "expo-router";
import "../../components/ui/styles";
import React from "react";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const RootLayout = () => {
    return (
        <React.Fragment>
            <StatusBar style="auto"/>
            <Tabs>
                <Tabs.Screen name="explorer" options={{title: 'Pesquisar',tabBarIcon: () => (<FontAwesome5 name="user-circle" size={24} color="black" />),}} />
                <Tabs.Screen name="account" options={{ title: 'Minha Conta', tabBarIcon: () => (<FontAwesome5 name="search" size={24} color="black" />),}} />
                <Tabs.Screen name="reservation" options={{ title: 'Reservas',tabBarIcon: () => (<FontAwesome5 name="briefcase" size={24} color="black" />),}} />
            </Tabs>
        </React.Fragment>
    )
}

export default RootLayout;


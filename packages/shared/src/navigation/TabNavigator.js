import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashBoard from "../screens/dashboard";
import AddUser from "../screens/addUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VectorIcon } from "@libs/components";
import AddProduct from "../screens/addProduct";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { height: 60 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'emoticon-neutral';
                    }
                    else if (route.name === 'AddProduct') {
                        iconName = 'emoticon-neutral';
                    }
                    else if (route.name === 'AddUser') {
                        iconName = 'emoticon-neutral';
                    }

                    // You can return any component that you like here!
                    return <VectorIcon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={DashBoard} />
            <Tab.Screen name="AddUser" component={AddUser} />
            <Tab.Screen name="AddProduct" component={AddProduct} />
        </Tab.Navigator>
    )
}

export default TabNavigator
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
const Tabs=createBottomTabNavigator();
export function AppNavigator(){return <Tabs.Navigator><Tabs.Screen name="Home" component={HomeScreen}/></Tabs.Navigator>}

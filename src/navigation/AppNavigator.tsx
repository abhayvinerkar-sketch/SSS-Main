import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {theme} from '../theme';
const Tabs=createBottomTabNavigator();
const Screen=({title,subtitle}:{title:string,subtitle:string})=><View style={s.wrap}><Text style={s.kicker}>SSC MASTER</Text><Text style={s.h1}>{title}</Text><Text style={s.sub}>{subtitle}</Text></View>;
const Home=()=> <Screen title="Good morning, Student 👋" subtitle="Dashboard • 68% preparation • 7 day streak"/>;
const Study=()=> <Screen title="Study" subtitle="Marathi • English • Hindi • Mathematics • Science • History • Geography"/>;
const Tests=()=> <Screen title="Tests" subtitle="Daily • Weekly • Monthly tests with sample questions"/>;
const Progress=()=> <Screen title="Progress" subtitle="Overall 78% • 12 tests • 76% average • 18h study"/>;
const Profile=()=> <Screen title="Profile" subtitle="10th • Maharashtra State Board • Target 90%"/>;
export function AppNavigator(){return <Tabs.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:theme.colors.primary}}><Tabs.Screen name="Home" component={Home}/><Tabs.Screen name="Study" component={Study}/><Tabs.Screen name="Tests" component={Tests}/><Tabs.Screen name="Progress" component={Progress}/><Tabs.Screen name="Profile" component={Profile}/></Tabs.Navigator>}
const s=StyleSheet.create({wrap:{flex:1,backgroundColor:theme.colors.background,padding:24,justifyContent:'center'},kicker:{color:theme.colors.primary,fontWeight:'800',letterSpacing:2},h1:{fontSize:30,fontWeight:'800',color:theme.colors.text,marginVertical:10},sub:{fontSize:15,color:theme.colors.muted,lineHeight:24}});

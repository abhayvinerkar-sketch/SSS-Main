import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { StudyScreen } from '../screens/StudyScreen';
import { SubjectScreen } from '../screens/SubjectScreen';
import { StudyPlanScreen } from '../screens/StudyPlanScreen';
import { ChapterReaderScreen } from '../screens/ChapterReaderScreen';
import { QuestionBankScreen } from '../screens/QuestionBankScreen';
import { StudyTutorScreen } from '../screens/StudyTutorScreen';
import { StudyNotebookScreen } from '../screens/StudyNotebookScreen';
import { TestsScreen } from '../screens/TestsScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { TestResultScreen } from '../screens/TestResultScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const T = createBottomTabNavigator();
const S = createNativeStackNavigator();
const Q = createNativeStackNavigator();

function StudyStack() {
  return (
    <S.Navigator screenOptions={{ headerShown: false }}>
      <S.Screen name="StudyHome" component={StudyScreen} />
      <S.Screen name="Subject" component={SubjectScreen} />
      <S.Screen name="Plan" component={StudyPlanScreen} />
      <S.Screen name="ChapterReader" component={ChapterReaderScreen} />
      <S.Screen name="QuestionBank" component={QuestionBankScreen} />
      <S.Screen name="StudyTutor" component={StudyTutorScreen} />
      <S.Screen name="StudyNotebook" component={StudyNotebookScreen} />
    </S.Navigator>
  );
}

function TestStack() {
  return (
    <Q.Navigator screenOptions={{ headerShown: false }}>
      <Q.Screen name="TestHome" component={TestsScreen} />
      <Q.Screen name="Quiz" component={QuizScreen} />
      <Q.Screen name="TestResult" component={TestResultScreen} />
    </Q.Navigator>
  );
}

const icons: Record<string, string> = {
  Home: '⌂',
  Study: '📚',
  Tests: '📝',
  Progress: '📈',
  Profile: '👤',
};

const tabIcon = (icon: string, color: string) => (
  <Text style={{ fontSize: 21, color, lineHeight: 23 }}>{icon}</Text>
);

export function AppNavigator() {
  return (
    <T.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 66,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '800' },
      }}
    >
      <T.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => tabIcon(icons.Home, color) }}
      />
      <T.Screen
        name="Study"
        component={StudyStack}
        options={{ tabBarIcon: ({ color }) => tabIcon(icons.Study, color) }}
      />
      <T.Screen
        name="Tests"
        component={TestStack}
        options={{ tabBarIcon: ({ color }) => tabIcon(icons.Tests, color) }}
      />
      <T.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ tabBarIcon: ({ color }) => tabIcon(icons.Progress, color) }}
      />
      <T.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => tabIcon(icons.Profile, color) }}
      />
    </T.Navigator>
  );
}

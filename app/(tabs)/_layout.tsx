import { Tabs, router } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
      screenListeners={{
        tabPress: (e) => {
          if (!e.target) return;
          const parts = e.target.split("-");
          const result = parts[0];

          if (result === 'index') {
            router.replace('/')
          }
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'คำถาม',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'help' : 'help-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'ผู้ชนะ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'trophy' : 'trophy-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

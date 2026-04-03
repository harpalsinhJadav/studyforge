import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Placeholder screens — replace with real screens
const HomeScreen = () => <View style={{ flex: 1, backgroundColor: '#0D0D18' }}><Text style={{ color: '#fff' }}>Home</Text></View>;
const LibraryScreen = () => <View style={{ flex: 1, backgroundColor: '#0D0D18' }}><Text style={{ color: '#fff' }}>Library</Text></View>;
const UploadScreen = () => <View style={{ flex: 1, backgroundColor: '#0D0D18' }}><Text style={{ color: '#fff' }}>Upload</Text></View>;
const QuizScreen = () => <View style={{ flex: 1, backgroundColor: '#0D0D18' }}><Text style={{ color: '#fff' }}>Quiz</Text></View>;
const ProfileScreen = () => <View style={{ flex: 1, backgroundColor: '#0D0D18' }}><Text style={{ color: '#fff' }}>Profile</Text></View>;

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Upload: undefined;
  Quiz: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#111120', borderTopColor: 'rgba(255,255,255,0.07)' },
        tabBarActiveTintColor: '#7C6FF7',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

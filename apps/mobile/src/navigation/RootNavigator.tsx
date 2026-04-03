import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  MaterialDetail: { id: string };
  ChapterReader: { materialId: string; chapterId: string };
  AskAI: { materialId: string };
  QuizSetup: undefined;
  QuizTopic: undefined;
  QuizActive: { quizId: string };
  QuizResults: { quizId: string };
  Leaderboard: undefined;
  Plans: undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

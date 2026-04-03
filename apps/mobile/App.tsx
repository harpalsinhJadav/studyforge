import { useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import { View } from 'react-native';
import { useFonts } from './src/hooks/useFonts';
import SplashScreen from './src/screens/SplashScreen';
import RootNavigator from './src/navigation/RootNavigator';

// Keep the native splash visible until fonts are loaded
SplashScreenExpo.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

export default function App() {
  const { loaded } = useFonts();
  const [showAppSplash, setShowAppSplash] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreenExpo.hideAsync();
    }
  }, [loaded]);

  // Fonts not ready — keep native splash showing
  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="light" backgroundColor="#0D0D18" />
        {showAppSplash ? (
          <SplashScreen onFinish={() => setShowAppSplash(false)} />
        ) : (
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        )}
      </View>
    </QueryClientProvider>
  );
}

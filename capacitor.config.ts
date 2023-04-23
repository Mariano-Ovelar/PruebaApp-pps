import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PruebaApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      /* launchShowDuration: 100000, */
      launchAutoHide: false,
      
    },
  },
};

export default config;

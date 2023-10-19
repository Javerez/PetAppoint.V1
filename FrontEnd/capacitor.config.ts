import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.petAppoint.www.app',
  appName: 'FrontEnd',
  webDir: 'dist/front-end',
  server: {
    androidScheme: 'https'
  }
};

export default config;

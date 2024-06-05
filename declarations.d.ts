declare module 'react-native-leaderboard' {
  // Here you can add the type definitions as needed for your usage of the module
  import { ComponentType } from 'react';
  import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

  type LeaderboardData = {
    userName: string;
    highScore: number;
    userIcon: string;
  };

  type LeaderboardProps = {
    data: LeaderboardData[];
    sortBy?: string;
    labelBy?: string;
    icon?: string;
    onRowPress?: (item: LeaderboardData) => void;
    containerStyle?: ViewStyle;
    rowStyle?: ViewStyle;
    rowTextStyle?: TextStyle;
    rowIconStyle?: ImageStyle;
  };

  const Leaderboard: ComponentType<LeaderboardProps>;

  export default Leaderboard;
}
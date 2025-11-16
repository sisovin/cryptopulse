module.exports = function (api) {
  api && api.cache && api.cache(true);
  const isWeb = process.env.EXPO_TARGET === 'web' || process.env.BABEL_ENV === 'web' || process.env.TARGET === 'web';
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Only include the reanimated plugin for native builds.
      // On web, this plugin may require native-only worklet transform dependencies and
      // can break bundling. Bypass for web to avoid 'react-native-worklets/plugin' errors.
      ...(isWeb ? [] : ['react-native-reanimated/plugin']),
    ],
  };
};


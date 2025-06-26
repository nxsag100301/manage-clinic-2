module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};

// yarn add --dev babel-plugin-module-resolver

// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         root: ['./src'], // thư mục gốc của project (có thể đổi)
//         alias: {
//           '@components': './src/components',
//           '@screens': './src/screens',
//           '@utils': './src/utils',
//           '@assets': './src/assets',
//           // Thêm alias tùy ý
//         },
//       },
//     ],
//   ],
// };

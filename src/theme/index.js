import { Dimensions, Platform } from 'react-native';
import deviceInfo from '../utils/deviceInfo';

export const platform = Platform.OS;
const deviceName = deviceInfo.deviceName || '';
let iPhone = [
  'IPHONE 6',
  'IPHONE 6 PLUS',
  'IPHONE 6S',
  'IPHONE 6S PLUS',
  'IPHONE 7',
  'IPHONE 7 PLUS',
  'IPHONE 8',
  'IPHONE 8 PLUS',
  'IPHONE SE (2016)', // iPhone SE thế hệ đầu tiên
  'IPHONE SE (2020)', // iPhone SE thế hệ thứ 2 (với thiết kế giống iPhone 8)
];

export const isIphone =
  platform === 'ios' && iPhone.indexOf(deviceName.toUpperCase()) > -1;

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const screenAvg = (Width + Height) / 2;

export const parseSize = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const percent = elemSize / screenAvg;
  return screenAvg * percent;
};
export const parseSizeHeight = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const heightBase = 844; // lấy chiều dọc iphone 12 làm chuẩn
  const percent = Height / heightBase;
  return elemSize * percent;
};

export const parseSizeWidth = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const widthBase = 390; // lấy chiều ngang iphone 12 làm chuẩn
  const percent = Width / widthBase;
  return elemSize * percent;
};

export const Colors = {
  background: '#FDFDFD',

  //Primary
  primary_50: '#FFEDD4',
  primary_300: '#FFC68B',
  primary_600: '#E68D09',
  primary_700: '#DA8200',
  primary_800: '#B56400',
  primary_900: '#5F2900',
  primary_1000: '#3F2500',

  //Black
  black_100: '#D2D2D5',
  black_200: '#A5A5AB',
  black_400: '#4A4C56',
  black_500: '#1D1F2C',
  black_900: '#030304',

  //Gray
  gray_25: '#F9F9FC',
  gray_50: '#F0F1F3',
  gray_100: '#E0E2E7',
  gray_200: '#C2C6CE',
  gray_400: '#858D9D',

  //Error
  error: '#DC2626',
  error_bg: '#FEECEE',

  //Success
  success: '#009800',
  success_bg: '#EEFFE2',

  //Warning
  warning: '#F2B600',
  warning_bg: '#FFFBEA',

  //Blue
  blue: '#423FFF',
  blue_bg: '#E7E7F6',

  //Green
  green: '#009800',
  green_bg: '#EEFFE2',
};

export const Sizes = {
  tab: parseSize(30),
  icon: parseSize(34),
  text: parseSize(12),
  tiny: parseSize(10),
  padding: parseSize(10),
  paddingSmall: parseSize(7),
  margin: parseSize(10),
  radius: parseSize(8),
  border: parseSize(1),

  //new app
  paddingHeight: parseSizeHeight(24),
  paddingWidth: parseSizeWidth(16),
  marginHeight: parseSizeHeight(24),
  marginWidth: parseSizeWidth(16),

  //new text
  text_h1: parseSizeWidth(48),
  text_h2: parseSizeWidth(36),
  text_h3: parseSizeWidth(32),
  text_h4: parseSizeWidth(24),
  text_h5: parseSizeWidth(20),
  text_h6: parseSizeWidth(18),
  text_subtitle1: parseSizeWidth(16),
  text_subtitle2: parseSizeWidth(14),
  text_tagline1: parseSizeWidth(12),
  text_tagline2: parseSizeWidth(10),
  textDefault: parseSizeWidth(14),

  //spacing
  iconSize_Width: parseSizeWidth(24),
  iconSize_Height: parseSizeHeight(24),
  Size_large_Width: parseSizeWidth(30),
  Size_large_Height: parseSizeHeight(30),
  spacing_1_Width: parseSizeWidth(4),
  spacing_1_Height: parseSizeHeight(4),
  spacing_2_Width: parseSizeWidth(8),
  spacing_2_Height: parseSizeHeight(8),
  spacing_3_Width: parseSizeWidth(12),
  spacing_3_Height: parseSizeHeight(12),
  spacing_4_Width: parseSizeWidth(16),
  spacing_4_Height: parseSizeHeight(16),
  spacing_5_Width: parseSizeWidth(24),
  spacing_5_Height: parseSizeHeight(24),
  spacing_6_Width: parseSizeWidth(32),
  spacing_6_Height: parseSizeHeight(32),
  spacing_7_Width: parseSizeWidth(40),
  spacing_7_Height: parseSizeHeight(40),
  spacing_8_Width: parseSizeWidth(48),
  spacing_8_Height: parseSizeHeight(48),
  spacing_9_Width: parseSizeWidth(64),
  spacing_9_Height: parseSizeHeight(64),
  header_logo_Width: parseSizeWidth(84),
  header_logo_Height: parseSizeHeight(49),
  heightLine_Width: parseSizeWidth(2),
  heightLine_Height: parseSizeHeight(2),
  input_Width: parseSizeWidth(361),
  input_Height: parseSizeHeight(46),
  input_radius_Width: parseSizeWidth(12),
  input_radius_Height: parseSizeHeight(12),
};

export const FontStyles = {
  InterLight: 'Inter-Light',
  InterMedium: 'Inter-Medium',
  InterSemiBold: 'Inter-SemiBold',
  InterBold: 'Inter-Bold',
  PenumbraBold: 'UTM-PenumbraBold',
};

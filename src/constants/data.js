import icons from './icons';
// const Pdf = require('../assets/pdf/mockPdf.pdf');

// export const mockPdf = Pdf;

export const mockData = [
  {
    icon: icons.booking,
    label: 'Đặt khám',
    screen: 'Booking',
  },
  {
    icon: icons.history,
    label: 'Lịch sử đặt khám',
    screen: null,
  },
  {
    icon: icons.person,
    label: 'Hồ sơ sức khỏe',
    screen: null,
  },
  {
    icon: icons.history,
    label: 'Lịch sử tiêm chủng',
    screen: null,
  },
  {
    icon: icons.payment,
    label: 'Thanh toán viện phí, đơn thuốc',
    screen: null,
  },
  {
    icon: icons.shield,
    label: 'Cận lâm sàng khám bệnh ngoại trú',
    screen: null,
  },
  {
    icon: icons.calendar,
    label: 'Xem thống kê',
    screen: 'Report',
  },
  {
    icon: icons.wallet,
    label: 'Hóa đơn GTGT',
    screen: null,
  },
  {
    icon: icons.run,
    label: 'Theo dõi sức khỏe',
    screen: null,
  },
  {
    icon: icons.support,
    label: 'Hỗ trợ',
    screen: null,
  },
];

export const settings = [
  {
    title: 'My Bookings',
    icon: icons.calendar,
  },
  {
    title: 'Payments',
    icon: icons.wallet,
  },
  {
    title: 'Profile',
    icon: icons.person,
  },
  {
    title: 'Notifications',
    icon: icons.bell,
  },
  {
    title: 'Security',
    icon: icons.shield,
  },
  {
    title: 'Language',
    icon: icons.language,
  },
  {
    title: 'Help Center',
    icon: icons.info,
  },
  {
    title: 'Invite Friends',
    icon: icons.people,
  },
];

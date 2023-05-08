import metrics from './metrics';

const size = {
  font11: metrics.screenWidth * (11 / 365),
  font12: metrics.screenWidth * (12 / 365),
  font14: metrics.screenWidth * (14 / 365),
  font17: metrics.screenWidth * (17 / 365),
  font13: metrics.screenWidth * (13 / 365),
  font31: metrics.screenWidth * (31 / 365),
  font23: metrics.screenWidth * (23 / 365),
};

const weight = {
  full: '900',
  semi: '600',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

const family = {
  Mont: 'Montserrat-Regular',
  Inter: 'Inter-Regular',
  IBM: 'IBMPlexSansDevanagari-Regular',
};

export default {
  size,
  weight,
  family,
};

import { VueI18nOptions } from 'vue-i18n';

export const numberFormats: VueI18nOptions['numberFormats'] = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD',
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
      minimumFractionDigits: 2,
    },
  },
};

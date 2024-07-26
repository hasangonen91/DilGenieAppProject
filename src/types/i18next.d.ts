import * as en from '@/translations/en';
import * as tr from '@/translations/tr';

import {defaultNS} from '@/translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof en;
  }
}

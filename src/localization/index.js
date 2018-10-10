/**
 * Created by congnt on 10/8/18.
 */
"use strict";

import i18n from "i18next";
import {withI18n, reactI18nextModule} from "react-i18next";
import LngDetector from 'i18next-browser-languagedetector';

i18n.use(reactI18nextModule).use(LngDetector)
    .init({
        resources: {
            en: {
                translation: require('../localization/en')               // 'common' is our custom namespace
            },
            vi: {
                translation: require('../localization/vi')
            },
        },
        fallbackLng: "en",
        detection: {
            order: ['querystring', 'localStorage'],
            // keys or params to lookup language from
            lookupQuerystring: 'lng',
            lookupLocalStorage: 'i18nextLng',
        },
        interpolation: {escapeValue: false},  // React already does escaping
    });

export default i18n
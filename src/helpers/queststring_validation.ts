import { QuestString } from '../types';

const ALL_LOCALES = [
  'ch',
  'cz',
  'en',
  'es-mx',
  'es',
  'fr',
  'ge',
  'hu',
  'it',
  'jp',
  'kr',
  'pl',
  'po',
  'ru',
  'sk',
  'tu',
];

const checkForQuestStringErrors = (questString: any): string | null => {
  if (typeof questString === 'string') {
    return null;
  }

  if (questString) {
    let localesAreOk = true;

    Object.keys(questString).forEach(localeName => {
      if (!ALL_LOCALES.includes(localeName)) {
        localesAreOk = false;
      }
    });

    if (!localesAreOk) {
      return 'Unknown locale names found';
    }
  }

  return null;
};

export const assertValidQuestString = (
  questString: any,
  fieldName: string,
): asserts questString is QuestString => {
  const result = checkForQuestStringErrors(questString);

  if (result !== null) {
    throw new Error(`${result} for '${fieldName}'`);
  }
};

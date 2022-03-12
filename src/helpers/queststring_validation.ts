import { LocaleName, QuestString } from '../types';
import { ALL_LOCALES } from './locales';

export const isValidLocale = (str: string): str is LocaleName => {
  return (ALL_LOCALES as string[]).includes(str);
};

const checkForQuestStringErrors = (questString: any): string | null => {
  if (typeof questString === 'string') {
    return null;
  }

  if (questString) {
    let localesAreOk = true;

    Object.keys(questString).forEach(localeName => {
      if (!isValidLocale(localeName)) {
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

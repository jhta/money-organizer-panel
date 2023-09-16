import { Categories } from '~/types';

const KNOWN_CATEGORIES_MAP = {
  'albert heijn': Categories.GROCERIES,
  jumbo: Categories.GROCERIES,
  dirk: Categories.GROCERIES,
  lidl: Categories.GROCERIES,
  action: Categories.GROCERIES,
  spar: Categories.GROCERIES,
  booking: Categories.TRAVEL,
  airbnb: Categories.TRAVEL,
  uber: Categories.TRANSPORT,
  ns: Categories.TRANSPORT,
  waternet: Categories.HOUSEHOLD,
  'budget energie': Categories.HOUSEHOLD,
  transavia: Categories.TRAVEL,
  klm: Categories.TRAVEL,
  easyjet: Categories.TRAVEL,
  cafe: Categories.RESTAURANTS_AND_COFFEE,
  coffee: Categories.RESTAURANTS_AND_COFFEE,
  restaurant: Categories.RESTAURANTS_AND_COFFEE,
  hema: Categories.SHOPPING,
  bol: Categories.SHOPPING,
  kruidvat: Categories.HEALTH,
  'holland&barrett': Categories.HEALTH,
  pathe: Categories.ENTERTAINMENT,
  thuisbezorgd: Categories.RESTAURANTS_AND_COFFEE,
};

const knownCategories = Object.keys(
  KNOWN_CATEGORIES_MAP
) as (keyof typeof KNOWN_CATEGORIES_MAP)[];

export const getKnownCategory = (description = '') => {
  const lowerCaseDescription = description.toLowerCase();

  const categoryKey = knownCategories.find(category =>
    lowerCaseDescription.includes(category)
  );

  if (!categoryKey) return undefined;

  return KNOWN_CATEGORIES_MAP[categoryKey];
};

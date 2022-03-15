import { DeepReadonly } from 'solid-js/store';

const ALL_DESCRIPTIVE_LOCATION_OBJ = {
  any: true,
  customs: true,
  factory: true,
  laboratory: true,
  interchange: true,
  lighthouse: true,
  reserve: true,
  shoreline: true,
  woods: true,
};

const ALL_LOCATIONS_OBJ = {
  any: true,
  customs: true,
  factory: true, // night and day
  factory4_day: true, // day only
  factory4_night: true, // night only
  laboratory: true,
  interchange: true,
  lighthouse: true,
  reserve: true,
  shoreline: true,
  woods: true,
};

export const ALL_LOCATIONS = Object.keys(ALL_LOCATIONS_OBJ);
export type PossibleLocation = keyof typeof ALL_LOCATIONS_OBJ;

export const ALL_DESCRIPTIVE_LOCATION = Object.keys(ALL_DESCRIPTIVE_LOCATION_OBJ);

export type DescriptiveLocation = keyof typeof ALL_DESCRIPTIVE_LOCATION_OBJ;

export type LocalizedString = {
  ch?: string;
  cz?: string;
  en?: string;
  'es-mx'?: string;
  es?: string;
  fr?: string;
  ge?: string;
  hu?: string;
  it?: string;
  jp?: string;
  kr?: string;
  pl?: string;
  po?: string;
  ru?: string;
  sk?: string;
  tu?: string;
};

export type LocaleName = keyof LocalizedString;

export type QuestType = 'Completion' | 'PickUp' | 'Elimination' | 'Loyalty' | 'Discover';
export type QuestString = string | LocalizedString;

export type KillTarget = 'Savage' | 'AnyPmc' | 'Usec' | 'Bear';

export type MissionKill = {
  type: 'Kill';
  target?: KillTarget;
  locations?: PossibleLocation[];
  count?: number;
  message?: QuestString;
};

export type MissionGiveItem = {
  type: 'GiveItem';
  accepted_items: string[];
  count?: number;
  found_in_raid_only?: boolean;
  message?: QuestString;
};

type CommonPlaceX = {
  zone_id: string; // TODO list all zone ids;
  plant_time?: number;
  need_survive?: QuestString;
  message?: QuestString;
};

export type MissionPlaceItem = {
  type: 'PlaceItem';
  accepted_items: string[];
} & CommonPlaceX;

export type MissionPlaceBeacon = {
  type: 'PlaceBeacon';
} & CommonPlaceX;

export type MissionPlaceSignalJammer = {
  type: 'PlaceSignalJammer';
} & CommonPlaceX;

export type MissionVisitPlace = {
  type: 'VisitPlace';
  place_id: string; // TODO: list all place ids
  need_survive?: QuestString;
  message?: QuestString;
};

export type QuestMission =
  | MissionKill
  | MissionGiveItem
  | MissionPlaceItem
  | MissionPlaceBeacon
  | MissionPlaceSignalJammer
  | MissionVisitPlace;

export type QuestRewards = {
  xp?: number;
  items?: {
    [itemId: string]: number;
  };
};

export type QuestData = {
  id: string;
  trader_id: string;
  disabled?: boolean;
  descriptive_location?: DescriptiveLocation;
  type?: QuestType;
  image?: string;
  name?: QuestString;
  description?: QuestString;
  success_message?: QuestString;
  level_needed?: number;
  locked_by_quests?: string[];
  unlock_on_quest_start?: string[];
  missions?: QuestMission[];
  rewards?: QuestRewards;
};

export type LoadedJsonFile = {
  name: string;
  data: QuestData[];
};

type QuestUpdateFn = (q: DeepReadonly<QuestData>) => DeepReadonly<QuestData>;
type QuestStringUpdateFn = (q: DeepReadonly<QuestString | undefined>) => DeepReadonly<QuestString>;

type Updator<T> = (fn: T) => void;

export type QuestUpdator = Updator<QuestUpdateFn>;
export type QuestStringUpdator = Updator<QuestStringUpdateFn>;

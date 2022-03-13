import { QuestMission, KillTarget } from '../types';
import { assertValidQuestString } from './queststring_validation';

const MISSION_TYPES = {
  Kill: true,
  GiveItem: true,
  PlaceItem: true,
  PlaceBeacon: true,
  PlaceSignalJammer: true,
  VisitPlace: true,
};

export type MissionType = keyof typeof MISSION_TYPES;

export const VALID_MISSION_TYPES: MissionType[] = [
  'Kill',
  'GiveItem',
  'PlaceItem',
  'PlaceBeacon',
  'PlaceSignalJammer',
  'VisitPlace',
];

const VALID_KILL_TARGETS: KillTarget[] = ['Savage', 'AnyPmc', 'Usec', 'Bear'];

const validateLocations = (mission: any) => {
  if (mission.locations !== undefined && !Array.isArray(mission.locations)) {
    throw new Error(`invalid kill mission: 'locations' should be an array`);
  }

  mission.locations.forEach((locationName: any) => {
    // TODO check if locationName is valid (aliases too)

    if (!locationName || typeof locationName !== 'string') {
      throw new Error(`invalid location found in kill mission`);
    }
  });
};

const validateAcceptedItems = (mission: any) => {
  if (!Array.isArray(mission.accepted_items)) {
    throw new Error(
      `invalid GiveItem 'accepted_items' field is missing or invalid for GiveItem mission`,
    );
  }

  mission.accepted_items.forEach((itemId: any) => {
    if (!itemId || typeof itemId !== 'string') {
      throw new Error(`invalid GiveItem 'accepted_items': ids should be a string`);
    }
  });
};

const validateCommonPlantZoneId = (mission: any) => {
  // TODO; check valid zoneId
  if (!mission.zone_id || typeof mission.zone_id !== 'string') {
    throw new Error(`invalid given zone_id for mission`);
  }

  if (mission.plant_time !== undefined && typeof mission.plant_time !== 'number') {
    throw new Error(`invalid plant_time type for mission, it should be a number`);
  }

  if (mission.need_survive !== undefined) {
    void assertValidQuestString(mission.need_survive, 'need_survive');
  }
};

const VALIDATE_FUNCTIONS: Record<string, (_: any) => void> = {
  Kill: (mission: any) => {
    if (mission.target !== undefined && !VALID_KILL_TARGETS.includes(mission.target)) {
      throw new Error(`invalid kill mission target '${mission.target}'`);
    }

    validateLocations(mission);

    if (mission.count !== undefined && typeof mission.count !== 'number') {
      throw new Error(`invalid kill mission 'count', it should be a number`);
    }
  },
  GiveItem: (mission: any) => {
    validateAcceptedItems(mission);

    if (mission.count !== undefined && typeof mission.count !== 'number') {
      throw new Error(`invalid GiveItem mission 'count', it should be a number`);
    }

    if (
      mission.found_in_raid_only !== undefined &&
      typeof mission.found_in_raid_only !== 'boolean'
    ) {
      throw new Error(`invalid GiveItem mission 'found_in_raid_only', it should be a boolean`);
    }
  },
  PlaceItem: (mission: any) => {
    validateCommonPlantZoneId(mission);
    validateAcceptedItems(mission);
  },
  PlaceBeacon: (mission: any) => {
    validateCommonPlantZoneId(mission);
  },
  PlaceSignalJammer: (mission: any) => {
    validateCommonPlantZoneId(mission);
  },
  VisitPlace: (mission: any) => {
    // TODO; check valid placeId
    if (!mission.place_id || typeof mission.place_id !== 'string') {
      throw new Error(`invalid given place_id for mission`);
    }

    if (mission.need_survive !== undefined) {
      void assertValidQuestString(mission.need_survive, 'need_survive');
    }
  },
};

export const assertValidMission = (mission: any): asserts mission is QuestMission => {
  if (typeof mission !== 'object') {
    throw new Error(`invalid mission, it should be an object`);
  }

  if (!VALID_MISSION_TYPES.includes(mission.type)) {
    throw new Error(`invalid mission 'type' field: '${mission.type}'`);
  }

  if (mission.message !== undefined) {
    void assertValidQuestString(mission.message, 'message');
  }

  const validateFunction = VALIDATE_FUNCTIONS[mission.type];

  if (!validateFunction) {
    throw new Error(`Fatal error: validation function not found`);
  }

  validateFunction(mission);
};

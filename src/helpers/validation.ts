import {
  QuestType,
  QuestRewards,
  ALL_DESCRIPTIVE_LOCATION,
  StoryItem,
  StoryItemBuild,
  StoryAcceptedItemGroup,
  CustomQuest,
} from '../types';
import { assertValidMission } from './mission_validation';
import { assertValidQuestString } from './queststring_validation';

/**
 * Story helpers
 */
export const isStoryItemBuild = (item: StoryItem): item is StoryItemBuild => {
  return item.type === '@build';
};

const assertValidStoryItemBuild = (item: StoryItem): item is StoryItemBuild => {
  if (!isStoryItemBuild(item)) {
    throw error(`'@build' directive: not a valid item`);
  }

  if (item.attachments !== undefined && typeof item.attachments !== 'object') {
    throw error(`'@build' directive: item 'attachments' should be an object`);
  }

  if (item.id === undefined) {
    throw error(`'@build' directive: no 'id' found`);
  }

  if (item.item === undefined) {
    throw error(`'' directive: no 'item' property found`);
  }

  return true;
};

export const isStoryAcceptedItemGroup = (item: StoryItem): item is StoryAcceptedItemGroup => {
  return item.type === '@group';
};

const assertValidStoryAcceptedItemGroup = (item: StoryItem): item is StoryAcceptedItemGroup => {
  if (!isStoryAcceptedItemGroup(item)) {
    throw error(`'@htoup' directive: not a valid item`);
  }

  if (item.id === undefined) {
    throw error(`'@group' directive: no 'id' found`);
  }

  if (item.items !== undefined && !Array.isArray(item.items)) {
    throw error(`'@group' directive: no valid 'items' array found`);
  }

  return true;
};

export const isStoryCustomQuest = (item: StoryItem): item is CustomQuest => {
  return !isStoryItemBuild(item) && !isStoryAcceptedItemGroup(item);
};

export const ALL_QUEST_TYPES = ['Completion', 'PickUp', 'Elimination', 'Loyalty', 'Discover'];

const DESCRIPTIVE_LOCATION_ALIASES: Record<string, string> = {
  rezervbase: 'reserve',
  bigmap: 'customs',
  labs: 'laboratory',
  '56f40101d2720b2a4d8b45d6': 'customs',
  '55f2d3fd4bdc2d5f408b4567': 'factory',
  '5714dbc024597771384a510d': 'interchange',
  '5b0fc42d86f7744a585f9105': 'laboratory',
  '5704e4dad2720bb55b8b4567': 'lighthouse',
  '5704e5fad2720bc05b8b4567': 'reserve',
  '5704e554d2720bac5b8b456e': 'shoreline',
  '5704e3c2d2720bac5b8b4567': 'woods',
};

const LOCATION_ALIASES: Record<string, string> = {
  '': 'any',
  bigmap: 'customs',
  rezervbase: 'reserve',
  labs: 'laboratory',
};

const error = (msg: string) => new Error(msg);

const isValidQuestType = (str: string): str is QuestType => {
  return ALL_QUEST_TYPES.includes(str);
};

const assertValidRewards = (rewards: any): asserts rewards is QuestRewards => {
  if (!rewards) {
    return;
  }

  if (rewards.xp !== undefined && typeof rewards.xp !== 'number') {
    throw error(`'rewards.xp' should be a number`);
  }

  if (rewards.items !== undefined && typeof rewards.items !== 'object') {
    throw error(`'rewards.items' should be an object`);
  }

  Object.keys(rewards.items).forEach(k => {
    if (typeof k !== 'string') {
      throw error(`invalid key found in 'rewards.items'`);
    }
  });

  Object.values(rewards.items).forEach(v => {
    if (typeof v !== 'number') {
      throw error(`invalid value found in 'rewards.items', it should be a number`);
    }
  });
};

const assertValidQuest = (questData: any): asserts questData is StoryItem => {
  const q = questData;

  if (!q.id || typeof q.id !== 'string') {
    throw error(`no valid 'id' found`);
  }

  if (!q.trader_id || typeof q.trader_id !== 'string') {
    throw error(`no valid 'trader_id' found`);
  }

  if (q.disabled !== undefined && q.disabled !== true && q.disabled !== false) {
    throw error(`'disabled' should be a boolean`);
  }

  if (q.descriptive_location !== undefined && typeof q.descriptive_location !== 'string') {
    throw error(`'descriptive_location' should be a string`);
  }

  if (
    q.descriptive_location !== undefined &&
    !ALL_DESCRIPTIVE_LOCATION.includes(q.descriptive_location)
  ) {
    throw error(`unknown 'descriptive_location' : ${q.descriptive_location}`);
  }
  if (q.type && !isValidQuestType(q.type)) {
    throw error(`invalid quest 'type' provided`);
  }

  if (q.image !== undefined && typeof q.image !== 'string') {
    throw error(`'image' should be a string`);
  }

  if (q.name !== undefined) {
    void assertValidQuestString(q.name, 'name');
  }

  if (q.description !== undefined) {
    void assertValidQuestString(q.description, 'description');
  }

  if (q.success_message !== undefined) {
    void assertValidQuestString(q.success_message, 'success_message');
  }

  if (q.level_needed !== undefined && typeof q.level_needed !== 'number') {
    throw error(`'level_needed' should be a number`);
  }

  if (q.locked_by_quests && !Array.isArray(q.locked_by_quests)) {
    throw error(`'locked_by_quests' should be an array`);
  }

  if (q.locked_by_quests) {
    q.locked_by_quests.forEach((questId: any) => {
      if (typeof questId !== 'string') {
        throw new Error(`invalid 'locked_by_quests' quest ids`);
      }
    });
  }

  if (q.unlock_on_quest_start && !Array.isArray(q.unlock_on_quest_start)) {
    throw error(`'unlock_on_quest_start' should be an array`);
  }

  if (q.unlock_on_quest_start) {
    q.unlock_on_quest_start.forEach((questId: any) => {
      if (typeof questId !== 'string') {
        throw new Error(`invalid 'unlock_on_quest_start' quest ids`);
      }
    });
  }

  if (q.rewards !== undefined) {
    void assertValidRewards(q.rewards);
  }

  if (q.missions !== undefined && !Array.isArray(q.missions)) {
    throw error(`'missions' should be an array`);
  }

  q.missions?.forEach((mission: any) => {
    void assertValidMission(mission);
  });
};

export const checkQuestJsonData = (givenData: any): StoryItem[] => {
  const data: any[] = Array.isArray(givenData) ? givenData : [givenData];

  const newData = data.map(questData => {
    const descriptive_location: string | undefined = questData.descriptive_location;
    const missions = questData.missions ?? [];

    return {
      ...questData,
      missions: missions.map((m: any) => {
        // set locations aliases on missions
        if (m.locations && m.locations.length) {
          return {
            ...m,
            locations: m.locations.map((locationName: string) => {
              if (LOCATION_ALIASES[locationName]) {
                return LOCATION_ALIASES[locationName];
              }
              return locationName;
            }),
          };
        }
        return m;
      }),
      // set descriptive_location aliases
      descriptive_location:
        DESCRIPTIVE_LOCATION_ALIASES[descriptive_location ?? ''] ?? descriptive_location,
    };
  });

  newData.forEach(storyItem => {
    if (isStoryItemBuild(storyItem)) {
      void assertValidStoryItemBuild(storyItem);
    } else if (isStoryAcceptedItemGroup(storyItem)) {
      void assertValidStoryAcceptedItemGroup(storyItem);
    } else {
      void assertValidQuest(storyItem);
    }
  });

  return newData;
};

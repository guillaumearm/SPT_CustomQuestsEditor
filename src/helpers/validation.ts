import { QuestData, QuestType, QuestRewards } from '../types';
import { assertValidMission } from './mission_validation';
import { assertValidQuestString } from './queststring_validation';
const ALL_QUEST_TYPES = ['Completion', 'PickUp', 'Elimination', 'Loyalty', 'Discover'];

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

const assertValidQuest = (questData: any): asserts questData is QuestData => {
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

  if (q.level_needed !== undefined && typeof q.level_needed !== 'undefined') {
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

export const checkQuestJsonData = (givenData: any): QuestData[] => {
  const data: any[] = Array.isArray(givenData) ? givenData : [givenData];

  data.forEach(questData => {
    void assertValidQuest(questData);
  });

  return data;
};

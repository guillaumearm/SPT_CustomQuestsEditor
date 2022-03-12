import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../types';
import { QuestDisabledInput } from '../forms/QuestDisabledInput';
import { QuestSimpleInput } from '../forms/QuestSimpleInput';
import { QuestStringInput } from '../forms/QuestStringInput';
import { QuestGenericDropdown } from '../forms/QuestGenericDropdown';
import { QuestIdsForm } from '../forms/QuestIdsForm';

export const ALL_TRADERS = [
  'prapor',
  'therapist',
  'fence',
  'skier',
  'peacekeeper',
  'mechanic',
  'ragman',
  'jaeger',
];

type Props = {
  allQuestIds: string[];
  questIndex: number | null;
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

export const QuestForm: Component<Props> = props => {
  const uniqQuestId = createMemo(() => {
    return `${props.quest.id}_${props.questIndex}`;
  });

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1px',
        padding: '10px',
        width: '50%',
        height: '400px',
        'overflow-y': 'scroll',
        'background-color': 'lightgrey',
        float: 'left',
      }}
    >
      <h4 style={{ 'text-align': 'center' }}>Quest configuration</h4>
      <form onSubmit={() => {}} style={{ 'margin-left': '21px' }}>
        <QuestDisabledInput formIndex={2} {...props} />
        <QuestSimpleInput formIndex={4} {...props} fieldName="id" />
        <QuestGenericDropdown
          formIndex={6}
          fieldName="trader_id"
          uniqQuestId={uniqQuestId()}
          allValues={ALL_TRADERS}
          value={props.quest.trader_id}
          setValue={v => props.updateQuest(q => ({ ...q, trader_id: v }))}
        />
        <QuestStringInput
          formIndex={8}
          updateQuestString={fn => props.updateQuest(q => ({ ...q, name: fn(q.name) }))}
          uniqQuestId={uniqQuestId()}
          questString={props.quest.name}
          fieldName="name"
        />
        <QuestIdsForm
          possibleValues={props.allQuestIds}
          {...props}
          uniqQuestId={uniqQuestId()}
          fieldName="locked_by_quests"
        />
        <QuestIdsForm
          possibleValues={props.allQuestIds}
          {...props}
          uniqQuestId={uniqQuestId()}
          fieldName="unlock_on_quest_start"
        />
      </form>
    </div>
  );
};

import { Component, createMemo } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { QuestData, QuestUpdator } from '../../types';
import { QuestDisabledInput } from '../forms/QuestDisabledInput';
import { QuestSimpleInput } from '../forms/QuestSimpleInput';
import { QuestStringInput } from '../forms/QuestStringInput';
import { QuestTraderDropdown } from '../forms/QuestTraderDropdown';

type Props = {
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
        height: '100%',
        'background-color': 'lightgrey',
        float: 'left',
      }}
    >
      <h4 style={{ 'text-align': 'center' }}>Selected quest {props.quest.id}</h4>
      <form style={{ 'margin-left': '21px' }}>
        <QuestDisabledInput {...props} />
        <QuestSimpleInput {...props} fieldName="id" />
        <QuestTraderDropdown {...props} />
        <QuestStringInput
          updateQuestString={fn => props.updateQuest(q => ({ ...q, name: fn(q.name) }))}
          uniqQuestId={uniqQuestId()}
          questString={props.quest.name}
          fieldName="name"
        />
      </form>
    </div>
  );
};

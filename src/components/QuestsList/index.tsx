import { Component, For, Show } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';
import { MainMenu, MainMenuItem } from '../MainMenu';

type Props = {
  file: DeepReadonly<LoadedJsonFile>;
  selectedQuest: null | number;
  onClickQuest: (index: number) => void;
  onCreateNewQuest: () => void;
  onRemoveQuestFile: () => void;
};

const QuestsList: Component<Props> = props => {
  return (
    <MainMenu isDragging={false} title="Quests">
      <For each={props.file?.data}>
        {(quest, index) => (
          <MainMenuItem
            disabled={Boolean(quest.disabled) || quest.id === ''}
            selected={index() === props.selectedQuest}
            onClick={() => props.onClickQuest(index())}
          >
            {quest.id || '<no id>'}
          </MainMenuItem>
        )}
      </For>

      {props.children}
      <div style={{ margin: '10px' }}>
        <input onClick={() => props.onCreateNewQuest()} type="button" value="Create new quest..." />
        <Show when={(props.file?.data ?? []).length === 0}>
          <div>
            <input
              onClick={() => props.onRemoveQuestFile()}
              type="button"
              value="Remove quest file..."
            />
          </div>
        </Show>
      </div>
    </MainMenu>
  );
};

export default QuestsList;

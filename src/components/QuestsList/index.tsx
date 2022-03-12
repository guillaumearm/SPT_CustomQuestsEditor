import { Component, For } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { LoadedJsonFile } from '../../types';
import { MainMenu, MainMenuItem } from '../MainMenu';

type Props = {
  file: DeepReadonly<LoadedJsonFile>;
  selectedQuest: null | number;
  onClickQuest: (index: number) => void;
};

const QuestsList: Component<Props> = props => {
  return (
    <MainMenu isDragging={false} title="Chained quests">
      <For each={props.file?.data}>
        {(quest, index) => (
          <MainMenuItem
            disabled={Boolean(quest.disabled)}
            selected={index() === props.selectedQuest}
            onClick={() => props.onClickQuest(index())}
          >
            {quest.id || '<no id>'}
          </MainMenuItem>
        )}
      </For>
      {props.children}
    </MainMenu>
  );
};

export default QuestsList;

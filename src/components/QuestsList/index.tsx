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
    <MainMenu title="Quests">
      <For each={props.file?.data}>
        {(quest, index) => (
          <MainMenuItem
            selected={index() === props.selectedQuest}
            onClick={() => props.onClickQuest(index())}
          >
            {quest.id}
          </MainMenuItem>
        )}
      </For>
    </MainMenu>
  );
};

export default QuestsList;

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
						index={index()}
						disabled={Boolean(quest.disabled) || quest.id === ''}
						selected={index() === props.selectedQuest}
						onClick={() => props.onClickQuest(index())}
						text={quest.id || '<no id>'}
					/>
				)}
			</For>

			{props.children}
			<div style={{ margin: '10px 0 10px 0' }}>
				<input onClick={() => props.onCreateNewQuest()} type="button" value="Create new quest..."/>
				<Show when={(props.file?.data ?? []).length === 0}>
					<div style={{ margin: '10px 0 10px 0' }}>
						<input
							onClick={() => props.onRemoveQuestFile()}
							className={'delete-button'}
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

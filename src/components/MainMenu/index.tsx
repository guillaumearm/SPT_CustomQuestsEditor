import { Component, createEffect, createMemo, createSignal, JSX, Match, Switch } from 'solid-js';

const liStyle = (selected = false, disabled = false): JSX.CSSProperties => {

	const getColor = () => {
		return selected ? 'white' : 'inherit';
	};

	const getBackgroundColor = () => {
		return selected ? '#282828' : 'inherit';
	};

	return {
		display: 'flex',
		cursor: 'pointer',
		width: '100%',
		color: getColor(),
		'background-color': getBackgroundColor(),
		'margin-bottom': '15px',
		'text-decoration': disabled ? 'line-through' : 'inherit',
	};
};

type Props = {
	title: string;
	children: JSX.Element;
	isDragging: boolean;
};

export const MainMenu: Component<Props> = props => {
	return (
		<div
			className={'responsive-item'}
			style={{
				'margin': '30px 0 30px 30px',
				padding: '10px',
				'min-width': '300px',
				'background-color': '#121212',
				float: 'left',
				color: 'white'
			}}
		>
			<div style={{ 'text-align': 'center' }}>
				<h4>{props.title}</h4>
			</div>
			<ul
				style={{
					padding: 0,
					'padding-bottom': '20px',
					'white-space': 'nowrap',
				}}
			>
				{props.children}
			</ul>
		</div>
	);
};

type ItemProps = {
	index: number;
	onClick: () => void;
	selected: boolean;
	text: string;
	disabled?: boolean;
	enableEdition?: boolean;
	onEditEnter?: (text: string, index: number) => void;
};

export const MainMenuItem: Component<ItemProps> = props => {
	const [text, setText] = createSignal(props.text);
	const [editable, setEditable] = createSignal(
		Boolean(props.enableEdition && props.text === 'new_quest_file'),
	);

	const menuItemId = createMemo(() => {
		return `${props.index}_${Boolean(props.enableEdition)}`;
	});

	const editionOk = () => {
		props.onEditEnter?.(text(), props.index);
		setEditable(false);
	};

	createEffect(() => {
		const el = document.getElementById(menuItemId());
		if (el) {
			el.focus();
			(el as HTMLInputElement).select();
		}

		return editable();
	});

	return (
		<li
			ondblclick={() => props.enableEdition && !editable() && setEditable(true)}
			onClick={() => props.onClick()}
			style={liStyle(props.selected, !!props.disabled)}
		>
			<Switch>
				<Match when={editable()}>
					<input
						id={menuItemId()}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								editionOk();
							}
						}}
						style={{ width: '100%' }}
						type="text"
						value={text()}
						onInput={e => setText(e.currentTarget.value)}
					/>
					<input onClick={() => editionOk()} style={{ 'margin-left': 'auto' }} type="button" value="Ok"/>
				</Match>
				<Match when={!editable()}>
					<div style={{
						width: '100%',
						border: '1px solid #FFF',
						padding: '10px',
					}}>
						{props.text}
					</div>
				</Match>
			</Switch>
		</li>
	);
};

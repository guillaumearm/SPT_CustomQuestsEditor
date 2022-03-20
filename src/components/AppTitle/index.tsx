import { Component } from 'solid-js';

type AppTitleProps = { children: string; customQuestsVersion: string };

export const AppTitle: Component<AppTitleProps> = props => {
	return (
		<>
			<div style={{
				position: 'relative',
				'background-color': '#121212',
				padding: '15px 30px 15px 30px',
				color: 'white'
			}}>
				<h2
					style={{
						'text-align': 'left',
					}}
				>
					{props.children}
				</h2>
				<h4
					className={'responsive-nav'}
					style={{
						position: 'absolute',
						margin: 0,
						right: '10px',
						top: '50%',
						transform: 'translateY(-50%)'
					}}
				>
					For{' '}
					<a
						target="_blank"
						style={{ color: '#00b2e8' }}
						href="https://hub.sp-tarkov.com/files/file/517-custom-quests/"
					>
						Custom Quests
					</a>{' '}
					v{props.customQuestsVersion}
				</h4>
			</div>
		</>
	);
};

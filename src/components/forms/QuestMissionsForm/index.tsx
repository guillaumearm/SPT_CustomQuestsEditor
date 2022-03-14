import { Component, createMemo, Index, Match, Switch } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { ChooseMissionType } from './ChooseMissionType';
import { MissionGiveItemForm } from './MissionGiveItemForm';
import { MissionKillForm } from './MissionKillForm';
import { CompatiblePlaceItemMission, MissionPlaceItemForm } from './MissionPlaceItemForm';
import { MissionVisitPlaceForm } from './MissionVisitPlaceForm';

import {
  MissionGiveItem,
  MissionKill,
  MissionPlaceItem,
  MissionVisitPlace,
  QuestData,
  QuestMission,
  QuestUpdator,
} from '../../../types';
import { update } from 'ramda';
import { MissionUpdator } from './types';

type Props = {
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

type QuestMissionCardProps = {
  questId: string;
  index: number;
  mission: DeepReadonly<QuestMission>;
  updateMission: MissionUpdator;
  onRemoveMission: () => void;
};

const QuestMissionCard: Component<QuestMissionCardProps> = props => {
  const headerMissionJSX = createMemo(() => {
    return (
      <>
        <h4 style={{ margin: 0, width: '90%', display: 'inline-block' }}>
          {props.mission.type} mission
        </h4>
        <input
          onClick={props.onRemoveMission}
          type="button"
          value="Remove"
          style={{ top: '0px', float: 'right' }}
        />
      </>
    );
  });

  return (
    <div
      style={{
        padding: '15px',
        'background-color': '#333333',
        color: 'white',
      }}
    >
      <Switch fallback={`Unknown mission type '${props.mission.type}'`}>
        <Match when={props.mission.type === 'Kill'}>
          <MissionKillForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionKill}
            updateMission={props.updateMission as MissionUpdator<MissionKill>}
          >
            {headerMissionJSX()}
          </MissionKillForm>
        </Match>
        <Match when={props.mission.type === 'GiveItem'}>
          <MissionGiveItemForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionGiveItem}
            updateMission={props.updateMission as MissionUpdator<MissionGiveItem>}
          >
            {headerMissionJSX()}
          </MissionGiveItemForm>
        </Match>
        <Match when={props.mission.type === 'PlaceItem'}>
          <MissionPlaceItemForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionPlaceItem}
            updateMission={props.updateMission as MissionUpdator<CompatiblePlaceItemMission>}
          >
            {headerMissionJSX()}
          </MissionPlaceItemForm>
        </Match>
        <Match when={props.mission.type === 'PlaceBeacon'}>
          <MissionPlaceItemForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionPlaceItem}
            updateMission={props.updateMission as MissionUpdator<CompatiblePlaceItemMission>}
          >
            {headerMissionJSX()}
          </MissionPlaceItemForm>
        </Match>
        <Match when={props.mission.type === 'PlaceSignalJammer'}>
          <MissionPlaceItemForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionPlaceItem}
            updateMission={props.updateMission as MissionUpdator<CompatiblePlaceItemMission>}
          >
            {headerMissionJSX()}
          </MissionPlaceItemForm>
        </Match>
        <Match when={props.mission.type === 'VisitPlace'}>
          <MissionVisitPlaceForm
            questId={props.questId}
            index={props.index}
            mission={props.mission as MissionVisitPlace}
            updateMission={props.updateMission as MissionUpdator<MissionVisitPlace>}
          >
            {headerMissionJSX()}
          </MissionVisitPlaceForm>
        </Match>
      </Switch>
    </div>
  );
};

export const QuestMissionsForm: Component<Props> = props => {
  const missions = createMemo<DeepReadonly<QuestMission[]>>(() => {
    return props.quest.missions ?? [];
  });

  const onRemoveMission = (indexMission: number) => {
    console.log(indexMission);
  };

  return (
    <div style={{ padding: '15px' }}>
      <input disabled={true} type="button" value="Add a mission..." />
      <Index each={missions()}>
        {(m, index) => {
          return (
            <div style={{ padding: '15px', 'background-color': 'grey' }}>
              <QuestMissionCard
                questId={props.quest.id}
                index={index}
                onRemoveMission={() => onRemoveMission(index)}
                updateMission={fn => {
                  return props.updateQuest(q => {
                    const missions = q.missions ?? [];
                    const updatedMissions = update(index, fn(m()), missions);

                    return { ...q, missions: updatedMissions };
                  });
                }}
                mission={m()}
              />
            </div>
          );
        }}
      </Index>
      <div style={{ padding: '15px', 'background-color': 'grey' }}>
        <ChooseMissionType onClickType={console.log} />
      </div>
    </div>
  );
};

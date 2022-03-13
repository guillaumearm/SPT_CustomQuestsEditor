import { Component, createMemo, For, Match, Switch } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

import { ChooseMissionType } from './ChooseMissionType';
import { MissionGiveItemForm } from './MissionGiveItemForm';
import { MissionKillForm } from './MissionKillForm';
import { MissionPlaceBeaconForm } from './MissionPlaceBeaconForm';
import { MissionPlaceItemForm } from './MissionPlaceItemForm';
import { MissionPlaceSignalJammerForm } from './MissionPlaceSignalJammerForm';
import { MissionVisitPlaceForm } from './MissionVisitPlaceForm';

import {
  MissionGiveItem,
  MissionKill,
  MissionPlaceBeacon,
  MissionPlaceItem,
  MissionPlaceSignalJammer,
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
  mission: DeepReadonly<QuestMission>;
  updateMission: MissionUpdator;
};

const QuestMissionCard: Component<QuestMissionCardProps> = props => {
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
            mission={props.mission as MissionKill}
            updateMission={props.updateMission as MissionUpdator<MissionKill>}
          />
        </Match>
        <Match when={props.mission.type === 'GiveItem'}>
          <MissionGiveItemForm
            mission={props.mission as MissionGiveItem}
            updateMission={props.updateMission as MissionUpdator<MissionGiveItem>}
          />
        </Match>
        <Match when={props.mission.type === 'PlaceItem'}>
          <MissionPlaceItemForm
            mission={props.mission as MissionPlaceItem}
            updateMission={props.updateMission as MissionUpdator<MissionPlaceItem>}
          />
        </Match>
        <Match when={props.mission.type === 'PlaceBeacon'}>
          <MissionPlaceBeaconForm
            mission={props.mission as MissionPlaceBeacon}
            updateMission={props.updateMission as MissionUpdator<MissionPlaceBeacon>}
          />
        </Match>
        <Match when={props.mission.type === 'PlaceSignalJammer'}>
          <MissionPlaceSignalJammerForm
            mission={props.mission as MissionPlaceSignalJammer}
            updateMission={props.updateMission as MissionUpdator<MissionPlaceSignalJammer>}
          />
        </Match>
        <Match when={props.mission.type === 'VisitPlace'}>
          <MissionVisitPlaceForm
            mission={props.mission as MissionVisitPlace}
            updateMission={props.updateMission as MissionUpdator<MissionVisitPlace>}
          />
        </Match>
      </Switch>
    </div>
  );
};

export const QuestMissionsForm: Component<Props> = props => {
  const missions = createMemo<DeepReadonly<QuestMission[]>>(() => {
    return props.quest.missions ?? [];
  });
  return (
    <div style={{ padding: '15px' }}>
      <input disabled={true} type="button" value="Add a mission..." />
      <For each={missions()}>
        {(m, index) => {
          return (
            <div style={{ padding: '15px', 'background-color': 'grey' }}>
              <QuestMissionCard
                updateMission={fn => {
                  return props.updateQuest(q => {
                    const missions = q.missions ?? [];
                    const updatedMissions = update(index(), fn(m), missions);

                    return { ...q, missions: updatedMissions };
                  });
                }}
                mission={m}
              />
            </div>
          );
        }}
      </For>
      <div style={{ padding: '15px', 'background-color': 'grey' }}>
        <ChooseMissionType onClickType={console.log} />
      </div>
    </div>
  );
};

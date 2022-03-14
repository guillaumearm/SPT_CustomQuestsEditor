import { Component, createMemo, createSignal, Index, Match, Show, Switch } from 'solid-js';
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
import { move, remove, update } from 'ramda';
import { MissionUpdator } from './types';
import { EMPTY_MISSIONS, MissionType } from '../../../helpers/mission_validation';

type Props = {
  quest: DeepReadonly<QuestData>;
  updateQuest: QuestUpdator;
};

type QuestMissionCardProps = {
  questId: string;
  index: number;
  nbMissions: number;
  mission: DeepReadonly<QuestMission>;
  updateMission: MissionUpdator;
  onRemoveMission: () => void;
  onClickUp: (index: number) => void;
  onClickDown: (index: number) => void;
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

        <input
          disabled={props.index === 0}
          onClick={() => props.onClickUp(props.index)}
          type="button"
          value="Up"
        />
        <input
          disabled={props.index === props.nbMissions - 1}
          onClick={() => props.onClickDown(props.index)}
          type="button"
          value="Down"
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
  const [adding, setAdding] = createSignal(false);

  const missions = createMemo<DeepReadonly<QuestMission[]>>(() => {
    return props.quest.missions ?? [];
  });

  const onAddMission = (missionType: MissionType) => {
    const newMission = EMPTY_MISSIONS[missionType];

    props.updateQuest(q => {
      const missions = q.missions ?? [];
      return { ...q, missions: [...missions, newMission] };
    });

    setAdding(false);
  };

  const onRemoveMission = (indexMission: number) => {
    props.updateQuest(q => {
      const missions = q.missions ?? [];
      return { ...q, missions: remove(indexMission, 1, missions) };
    });
  };

  const reorderUp = (index: number) => {
    props.updateQuest(q => {
      const missions = q.missions ?? [];
      if (index === 0) {
        return q;
      }
      return { ...q, missions: move(index, index - 1, missions) };
    });
  };

  const reorderDown = (index: number) => {
    props.updateQuest(q => {
      const missions = q.missions ?? [];
      if (index === missions.length - 1) {
        return q;
      }
      return { ...q, missions: move(index, index + 1, missions) };
    });
  };

  return (
    <div style={{ padding: '15px' }}>
      <Index each={missions()}>
        {(m, index) => {
          return (
            <div style={{ padding: '15px', 'background-color': 'grey' }}>
              <QuestMissionCard
                nbMissions={missions().length}
                onClickUp={reorderUp}
                onClickDown={reorderDown}
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
      <Show when={!adding()}>
        <input onClick={() => setAdding(true)} type="button" value={'Add a mission...'} />
      </Show>

      <Show when={adding()}>
        <div style={{ padding: '15px', 'background-color': 'grey' }}>
          <input onClick={() => setAdding(false)} type="button" value={'Cancel'} />
          <ChooseMissionType onClickType={onAddMission} />
        </div>
      </Show>
    </div>
  );
};

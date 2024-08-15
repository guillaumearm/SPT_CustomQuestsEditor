import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { allPlacesByMap } from '../../../helpers/allPlacesByMap';
import { MissionVisitPlace } from '../../../types';
import { MissionUpdator } from '../QuestMissionsForm/types';
import { QuestSimpleDropdown } from '../QuestSimpleDropdown';

const ALL_CONCERNED_MAP = Object.keys(allPlacesByMap);

const findMapForPlaceId = (placeId: string): string | undefined => {
  return ALL_CONCERNED_MAP.find(mapId => allPlacesByMap[mapId].includes(placeId));
};

type CompatibleMission = MissionVisitPlace;

type Props = {
  mission: DeepReadonly<CompatibleMission>;
  updateMission: MissionUpdator<CompatibleMission>;
};

export const MissionPlaceIdInput: Component<Props> = props => {
  const [selectedMap, setSelectedMap] = createSignal('bigmap');
  const [mapChangedByUser, setMapChangedByUser] = createSignal(0);

  const availablePlaces = createMemo(() => {
    return allPlacesByMap[selectedMap()];
  });

  createEffect(prev => {
    if (prev !== undefined && prev !== mapChangedByUser()) {
      props.updateMission(m => ({ ...m, place_id: allPlacesByMap[selectedMap()][0] }));
    }
    return mapChangedByUser();
  });

  createEffect(prev => {
    if (prev !== props.mission.place_id) {
      const map = findMapForPlaceId(props.mission.place_id);
      if (map) {
        setSelectedMap(map);
      }
    }

    return props.mission.place_id;
  });

  return (
    <>
      <QuestSimpleDropdown
        fieldName="map"
        formIndex={-1}
        values={ALL_CONCERNED_MAP}
        selectedValue={selectedMap()}
        onValueChanged={v => {
          setSelectedMap(v);
          setMapChangedByUser(x => x + 1);
        }}
      />
      <QuestSimpleDropdown
        fieldName="place_id"
        fieldLink="https://github.com/guillaumearm/SPT_CustomQuests/blob/master/docs/ALL_PLACES.md"
        formIndex={-1}
        values={availablePlaces()}
        selectedValue={props.mission.place_id}
        onValueChanged={v => {
          props.updateMission(m => ({ ...m, place_id: v }));
        }}
      />
    </>
  );
};

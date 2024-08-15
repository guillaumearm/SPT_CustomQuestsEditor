import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { allZonesByMap } from '../../../helpers/allZonesByMap';
import { MissionPlaceBeacon, MissionPlaceItem, MissionPlaceSignalJammer } from '../../../types';
import { MissionUpdator } from '../QuestMissionsForm/types';
import { QuestSimpleDropdown } from '../QuestSimpleDropdown';

const ALL_CONCERNED_MAP = Object.keys(allZonesByMap);

const findMapForZoneId = (zoneId: string): string | undefined => {
  return ALL_CONCERNED_MAP.find(mapId => allZonesByMap[mapId].includes(zoneId));
};

type CompatibleMission = MissionPlaceItem | MissionPlaceBeacon | MissionPlaceSignalJammer;

type Props = {
  mission: DeepReadonly<CompatibleMission>;
  updateMission: MissionUpdator<CompatibleMission>;
};

export const MissionZoneIdInput: Component<Props> = props => {
  const [selectedMap, setSelectedMap] = createSignal('bigmap');
  const [mapChangedByUser, setMapChangedByUser] = createSignal(0);

  const availableZones = createMemo(() => {
    return allZonesByMap[selectedMap()];
  });

  createEffect(prev => {
    if (prev !== undefined && prev !== mapChangedByUser()) {
      props.updateMission(m => ({ ...m, zone_id: allZonesByMap[selectedMap()][0] }));
    }
    return mapChangedByUser();
  });

  createEffect(prev => {
    if (prev !== props.mission.zone_id) {
      const map = findMapForZoneId(props.mission.zone_id);
      if (map) {
        setSelectedMap(map);
      }
    }

    return props.mission.zone_id;
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
        fieldName="zone_id"
        fieldLink="https://github.com/guillaumearm/SPT_CustomQuests/blob/master/docs/ALL_ZONES.md"
        formIndex={-1}
        values={availableZones()}
        selectedValue={props.mission.zone_id}
        onValueChanged={v => {
          props.updateMission(m => ({ ...m, zone_id: v }));
        }}
      />
    </>
  );
};

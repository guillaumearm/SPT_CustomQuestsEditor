import { DeepReadonly } from 'solid-js/store';
import { QuestMission } from '../../../types';

type Updator<T> = (fn: (x: T) => T) => void;

export type MissionUpdator<T = QuestMission> = Updator<DeepReadonly<T>>;

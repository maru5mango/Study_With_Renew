import {
  PosData,
  LevelData,
  LocationData,
  AvailableTimeData,
  AvailableWeekData,
  FieldData,
} from './OptionData';

export const PostTransfer = (value: string | undefined) => {
  const PostText = PosData.find((item) => {
    if (item.value === value) return item;
  });
  return PostText?.label;
};

export const LevelTransfer = (value: string | undefined) => {
  const LevelText = LevelData.find((item) => {
    if (item.value === value) return item;
  });
  return LevelText?.label;
};

export const LevelTextTransfer = (value: string | undefined) => {
  const LevelText = LevelData.find((item) => {
    if (item.value === value) return item;
  });
  return LevelText?.text;
};

export const LocationTransfer = (value: string | undefined) => {
  const LocationText = LocationData.find((item) => {
    if (item.value === value) return item;
  });
  return LocationText?.label;
};

export const TimeTransfer = (value: string | undefined) => {
  const TimeText = AvailableTimeData.find((item) => {
    if (item.value === value) return item;
  });
  return TimeText?.label;
};

export const WeekTransfer = (value: string | undefined) => {
  const WeekText = AvailableWeekData.find((item) => {
    if (item.value === value) return item;
  });
  return WeekText?.label;
};

export const FieldTransfer = (value: string | undefined) => {
  const FieldText = FieldData.find((item) => {
    if (item.value === value) return item;
  });
  return FieldText?.label;
};

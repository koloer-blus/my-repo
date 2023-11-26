import { useMemo } from "react";
import { ICategorySearchTagItem } from "./types";

export const useUserClickOptions = (data: ICategorySearchTagItem[]) => {
  const options = useMemo(() => data.map(item => ({
    label: item.label,
    value: item.field
  })), [data]);
  return options;
}
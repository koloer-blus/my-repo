import { CSSProperties, ReactNode } from 'react';

export type TCategoryInnerComponents =
  | 'Input'
  | 'Select'
  | 'Radio'
  | 'Checkbox'
  | 'MultSelect'
  | 'InputTag'
  | 'DatePicker'
  | 'DateRangerPicker'
  | 'Custom';

export type TDataOptions = {
  label: ReactNode | string;
  value: string | number;
  disabled?: boolean;
  extra?: any;
}[];

export type TCategoryItemValue = {
  value: unknown;
  field: ICategoryDataItem['field'];
};

export type TCategoryValue = TCategoryItemValue[];

export type TChangeFieldValue = (value?: unknown) => TCategoryValue;

export type TUserActionType = 'ADD' | 'EDIT';

export interface ICategoryDataItem {
  fieldComponentType: TCategoryInnerComponents;
  field: string;
  label: ReactNode | string;
  options?: TDataOptions;
  perfixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  split?: ReactNode | string;
  customPlaceholder?: string;
  updateInputTextValue?: (value: string, data: ICategoryDataItem) => unknown;
  renderInputText?: (value: unknown, data: ICategoryDataItem) => string;
  renderCustomValueTag?: (value: unknown, values: TCategoryValue, data: ICategoryDataItem) => ReactNode;
  renderDropPannel?: (props: {
    data: ICategoryDataItem;
    values: TCategoryValue;
    value: unknown;
    mode: TUserActionType;
    changeFieldValue: TChangeFieldValue;
  }) => ReactNode;
}

export interface ICategorySearchProps {
  data?: ICategoryDataItem[];
  style?: CSSProperties;
  className?: string;
  dropClassName?: string;
  onChange?: (
    value: Record<string, unknown>,
    values: TCategoryValue,
    mapValue: Record<string, unknown>
  ) => void;
  value: TCategoryValue;
}

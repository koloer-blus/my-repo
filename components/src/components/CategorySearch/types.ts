import {CSSProperties} from "react";

export type TCategorySearchComponentType = 'Input' | 'Select' | 'CheckBox' | 'Radio' | 'DatePicker' | 'DateRangerPicker';

export interface  ICategoryOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface ICateggorySearchDataItem {
    field: string;
    filterType: TCategorySearchComponentType;
    label: string;
    options?: ICategoryOption[];
}

export type ICategorySearchMapValue = Record<string, string | string[] | undefined>;

export interface ICategorySearchProps {
    data: ICateggorySearchDataItem[];
    style?: CSSProperties;
    className?: string;
    value?: ICategorySearchMapValue;
    onChange?: (value: ICategorySearchMapValue) => void;
}

export interface IBaseDropComponentProps {
    value?: string | string[];
    onChange: (value: string | string[]) => void;
}
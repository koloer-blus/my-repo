export type TComponentType = 'Cascader' | 'CheckBox' | 'DatePiacker' | 'Input' | 'Select' | 'Radio' | 'TimePicker';

export interface ICategorySearchTagItem {
    field: string;
    label: string;
    type: TComponentType;
    /**
     * Cascader,CheckBox,Select
     */
    options?: any[]
}
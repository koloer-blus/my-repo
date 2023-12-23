import { ICategoryDataItem, ICategorySearchProps, TCategoryItemValue, TCategoryValue } from '../types';
import _ from 'lodash-es';

export const getExistsCurrentFieldInValue = (field: string, value: TCategoryValue = []) =>
  value.map((item) => item.field).includes(field);

export const getCurrentFieldLabel = (key: string, data: ICategorySearchProps['data']) =>
  data?.find((item) => item.field === key)?.label;

export const getCurrentFieldEditText = (value: TCategoryItemValue, data?: ICategoryDataItem): string => {
  if (data?.renderInputText) {
    return data?.renderInputText?.(value, data);
  }
  if (data?.fieldComponentType === 'DateRangerPicker') {
    return (value.value as string[]).join('-');
  }
  if (data?.fieldComponentType === 'InputTag') {
    return (value.value as string[]).join('|');
  }
  if (data?.options) {
    return data.options
      .filter((item) => (value.value as string).includes(item.value as string))
      .map((item) => (_.isString(item.label) ? item.label : item.value))
      .join('|');
  }
  return value.value as string;
};

export const getSearchPlaceholder = (currentData?: ICategoryDataItem) => {
  if (!currentData) {
    return '点击进行分类搜索';
  }
  if (currentData.customPlaceholder) {
    return currentData.customPlaceholder;
  }
  if (['Input', 'InputTag'].includes(currentData.fieldComponentType)) {
    return '请输入分类搜索值';
  }
  if (['DatePicker', 'DateRangerPicker'].includes(currentData.fieldComponentType)) {
    return '请选择搜索日期';
  }
  return '请选择对应搜索值';
};

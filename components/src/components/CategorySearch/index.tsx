import { Dropdown, InputTag } from '@arco-design/web-react';
import { ICategorySearchMapValue, ICategorySearchProps } from './types.ts';
import { useCallback, useMemo, useState } from 'react';
import { DropOptions } from './drop-options';
import _ from 'lodash-es';
import { DropInput } from './drop-input';
import { DropDatePicker } from './drop-date-picker';

export const CategorySearch = (props: ICategorySearchProps) => {
  const { data = [], onChange, value, ...resetInputTagProps } = props;

  const [fieldCacheKey, setFieldCacheKey] = useState<string | undefined>();
  const [searchMap, setSearchMap] = useState<ICategorySearchMapValue>({});
  const [tagValues, setTagValues] = useState<
    {
      label: string;
      value: {
        field: string;
        value?: string[] | string;
      };
    }[]
  >([]);

  const fieldOptions = useMemo(
    () =>
      data.map((item) => ({
        label: item.label,
        value: item.field
      })),
    [data]
  );

  const clearFieldCacheKey = () => setFieldCacheKey(undefined);

  const getFieldTagKeyIndex = useCallback(
    (fieldKey: string) => tagValues.findIndex((item) => item.value.field === fieldKey),
    [tagValues]
  );

  const getCurrentFieldData = useCallback(
    (field: string) => {
      if (field) {
        return data.find((item) => item.field === field);
      }
      return null;
    },
    [data]
  );

  const FieldOptions = useMemo(
    () => (
      <DropOptions
        onChange={(v) => {
          const tagValueIndex = getFieldTagKeyIndex(v);
          const fieldData = getCurrentFieldData(v);
          if (tagValueIndex < 0 && fieldData) {
            const tempTagValues = [
              ...tagValues,
              {
                label: fieldData.label,
                value: {
                  field: fieldData.field
                }
              }
            ];
            setTagValues(tempTagValues);
          }
          setFieldCacheKey(v as string);
        }}
        mode={'selectItem'}
        options={fieldOptions}
      />
    ),
    [fieldOptions, getFieldTagKeyIndex, getCurrentFieldData, tagValues]
  );

  const updateSearchMap = useCallback(
    (field: string, value?: string | string[]) => {
      let mergedValue = searchMap;
      if (_.isArray(value)) {
        mergedValue = {
          ...mergedValue,
          [field]: [...((searchMap[field] as string[]) || []), ...(value as string[])]
        };
      } else {
        mergedValue = {
          ...mergedValue,
          [field]: value
        };
      }
      setSearchMap(mergedValue);
      const tagIndex = getFieldTagKeyIndex(field);
      const tempTagValues = [...tagValues];
      if (mergedValue[field].length) {
        const currentFieldData = getCurrentFieldData(field);
        const valueLabels = currentFieldData?.options?.length
          ? currentFieldData.options
              .reduce((p, c) => {
                if (_.isArray(mergedValue[field])) {
                  if (mergedValue[field].includes(c.value)) {
                    p = [...p, c.label];
                  }
                } else {
                  if (mergedValue[field] === c.value) {
                    p = [c.label];
                  }
                }
                return p;
              }, [])
              .join('|')
          : _.isArray(mergedValue[field])
          ? mergedValue[field].join('-')
          : mergedValue[field];
        tempTagValues[tagIndex] = {
          label: `${tempTagValues[tagIndex].label}:${valueLabels}`,
          value: {
            value: mergedValue,
            field: field
          }
        };
      } else {
        tempTagValues.splice(tagIndex, 1);
      }
      setTagValues(tempTagValues);
    },
    [searchMap, getFieldTagKeyIndex, tagValues, getCurrentFieldData]
  );

  const currentFieldData = useMemo(() => {
    if (fieldCacheKey) {
      return data.find((item) => item.field === fieldCacheKey);
    }
    return null;
  }, [data, fieldCacheKey]);

  const CurrentFieldPanel = useMemo(() => {
    if (!currentFieldData) return null;
    const currentField = currentFieldData.field;
    const currentFilterType = currentFieldData.filterType;
    const value = searchMap?.[currentField];

    const baseDropComponentProps = {
      value: value,
      onChange: (v) => updateSearchMap(currentField, v as string)
    };

    if (currentFilterType === 'Input') {
      return <DropInput {...baseDropComponentProps} />;
    }
    if (['DatePicker', 'DateRangerPicker'].includes(currentFilterType)) {
      return (
        <DropDatePicker
          {...baseDropComponentProps}
          mode={currentFilterType === 'DatePicker' ? 'normal' : 'ranger'}
        />
      );
    }
    if (currentFieldData?.options?.length) {
      const checkBoxMode = currentFilterType === 'CheckBox';
      return <DropOptions mode={checkBoxMode ? 'checkbox' : 'selectItem'} {...baseDropComponentProps} />;
    }
    return null;
  }, [currentFieldData, updateSearchMap, searchMap]);

  return (
    <Dropdown trigger={'click'} droplist={fieldCacheKey ? CurrentFieldPanel : FieldOptions}>
      <InputTag
        {...resetInputTagProps}
        value={tagValues}
        onBlur={() => clearFieldCacheKey()}
        onClear={() => clearFieldCacheKey()}
      />
    </Dropdown>
  );
};

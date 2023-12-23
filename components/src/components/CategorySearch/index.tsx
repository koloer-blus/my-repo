import { Dropdown, Input, Space } from '@arco-design/web-react';
import { ICategorySearchProps, TCategoryValue } from './types';
import { useMemo, useState } from 'react';
import _ from 'lodash-es';
import './styles.css';
import { FieldDropPannel, renderFieldDataDropPannel, renderTags } from './components';
import { getCurrentFieldEditText, getExistsCurrentFieldInValue, getSearchPlaceholder } from './utils';
import { IconCloseCircle } from '@arco-design/web-react/icon';

export const CategorySearch = (props: ICategorySearchProps) => {
  const { data, value, onChange, className = '', style = {}, dropClassName = '' } = props;

  const [categoryValue, setCategoryValue] = useState<TCategoryValue>(value || []);
  const [inputValue, setInputValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [cacheField, setCacheField] = useState<string>();

  const updateFieldValue = (value: unknown, values: TCategoryValue) => {
    setCategoryValue(values);
    const valueMap = values.reduce((p, c) => {
      p[c.field] = c.value;
      return p;
    }, {} as Record<string, unknown>);
    onChange?.(
      {
        [cacheField!]: value
      },
      values,
      valueMap
    );
    setCacheField(undefined);
    setSearchValue(undefined);
    setInputValue(undefined);
  };

  const removeTag = (field: string) => {
    const tempValue = categoryValue.filter((item) => item.field !== field);
    updateFieldValue(
      {
        [field]: undefined
      },
      tempValue
    );
  };

  const changeFieldValue = (value?: unknown) => {
    if (!cacheField) return categoryValue;
    // 清理
    if (_.isEmpty(value)) {
      const tempValue = categoryValue.filter((item) => item.field !== cacheField);
      updateFieldValue(value, tempValue);
      return tempValue;
    }
    const isExist = getExistsCurrentFieldInValue(cacheField, categoryValue);
    if (isExist) {
      const tempValue = categoryValue.map((item) => {
        if (item.field === cacheField) {
          return {
            field: item.field,
            value
          };
        }
        return item;
      });
      updateFieldValue(value, tempValue);
      return tempValue;
    }
    const tempValue = [
      ...categoryValue,
      {
        field: cacheField,
        value
      }
    ];
    updateFieldValue(value, tempValue);
    return tempValue;
  };

  const FieldDropEl = useMemo(
    () => (
      <FieldDropPannel
        data={data}
        searchValue={searchValue}
        updateCacheField={(v) => {
          setCacheField(v);
        }}
      />
    ),
    [data, searchValue, setCacheField]
  );

  const currentFieldData = useMemo(() => data?.find((item) => item.field === cacheField), [data, cacheField]);

  const CurrentFieldPannel = useMemo(
    () =>
      renderFieldDataDropPannel({
        fieldData: currentFieldData,
        value: categoryValue,
        changeFieldValue
      }),
    [currentFieldData, categoryValue, changeFieldValue]
  );

  const dropList = useMemo(() => {
    if (!cacheField) {
      return <div className="drop-wrapper">{FieldDropEl}</div>;
    }
    if (CurrentFieldPannel) {
      return <div className="drop-wrapper">{CurrentFieldPannel}</div>;
    }
    return null;
  }, [cacheField, CurrentFieldPannel, FieldDropEl]);

  const fieldSearchInput = (
    <Input
      className={'custom-input'}
      placeholder={getSearchPlaceholder(currentFieldData)}
      autoWidth
      onKeyDown={(e) => {
        if (e.code === 'Backspace' && !searchValue) {
          const lastestField = categoryValue[categoryValue.length - 1].field;
          removeTag(lastestField);
        }
      }}
      disabled={!!cacheField}
      value={searchValue}
      onChange={(value) => {
        setSearchValue(value);
      }}
    />
  );

  const cacheLabel = currentFieldData?.label ? (
    <div className="label">{currentFieldData?.label}：</div>
  ) : null;

  const existCache = categoryValue.find((item) => item.field === cacheField);

  const updateInputStringToValue = (labelValue: string) => {
    if (currentFieldData?.updateInputTextValue) {
      const value = currentFieldData.updateInputTextValue(labelValue, currentFieldData);
      changeFieldValue(value);
      return;
    }
    if (currentFieldData?.options) {
      const list = labelValue?.split('|');
      const value = list.reduce((p, c) => {
        const option = currentFieldData.options?.find((item) => item.label === c);
        if (option?.value) {
          p = [...p, option.value];
        }
        return p;
      }, [] as any);
      changeFieldValue(value);
      return;
    }
    changeFieldValue(labelValue);
  };

  const fieldInput = (
    <Input
      className={'custom-input'}
      value={inputValue}
      autoWidth
      placeholder="请输入选项内容"
      style={{
        maxWidth: 350
      }}
      onKeyDown={(e) => {
        if (e.code === 'Backspace' && !inputValue) {
          const lastestField = categoryValue[categoryValue.length - 1].field;
          removeTag(lastestField);
        }
      }}
      onChange={(value) => {
        setInputValue(value);
      }}
      onPressEnter={() => {
        updateInputStringToValue(inputValue as string);
        setInputValue('');
      }}
    />
  );

  const tagList = useMemo(
    () =>
      categoryValue.map((item) => {
        const isEdit = cacheField === item.field;
        const matchData = data?.find((dataItem) => dataItem.field === item.field);
        return isEdit ? (
          <div key={item.field}>
            <span className="label">{matchData?.label}：</span>
            {fieldInput}
          </div>
        ) : (
          <div key={item.field}>
            {renderTags({
              value: item,
              values: categoryValue,
              data: matchData,
              removeTag,
              clickTag: () => {
                setCacheField(item.field);
                const editValue = getCurrentFieldEditText(item, matchData);
                setInputValue(editValue);
              }
            })}
          </div>
        );
      }),
    [categoryValue, data, setCacheField, cacheField, fieldInput, setInputValue, removeTag]
  );

  return (
    <Dropdown
      trigger={'click'}
      triggerProps={{
        clickToClose: false,
        className: dropClassName
      }}
      droplist={dropList}
    >
      <Space
        className={`wrapper ${className}`}
        style={{
          width: '100%',
          minWidth: 800,
          border: '1px solid rgb(22,93,255)',
          padding: '8px 12px 0 6px',
          position: 'relative',
          ...style
        }}
        wrap
      >
        <IconCloseCircle
          style={{
            position: 'absolute',
            top: '50%',
            right: 6,
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
          onClick={() => {
            setCategoryValue([]);
            onChange?.({}, [], {});
          }}
        />
        {tagList}
        {existCache ? null : cacheLabel}
        {cacheField && !existCache ? fieldInput : null}
        {!cacheField ? fieldSearchInput : null}
      </Space>
    </Dropdown>
  );
};

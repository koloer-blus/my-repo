import { ICategoryInputProps } from './types';
import * as S from './styles';
import { useRef, useState } from 'react';
import { Message, Space, Tag } from '@arco-design/web-react';

export const CategoryInput = (props: ICategoryInputProps) => {
  const { style, className } = props;
  const [inputValue, setInputValue] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tagWrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDListElement | null>(null);
  const [_position, setPosition] = useState<number | undefined>();
  const [isEdit, setIsEdit] = useState('');

  const getPositionX = (type: 'edit' | 'add', key?: string) => {
    if (tagWrapperRef.current && type === 'edit' && key) {
      const tagItem = tagWrapperRef.current.getElementsByClassName(key)[0];
      setPosition(tagItem.getBoundingClientRect()?.left);
      return;
    }
    if (inputRef.current && type === 'add') {
      setPosition(inputRef.current.getBoundingClientRect()?.left);
      return;
    }
    setPosition(undefined);
  };

  const addTag = (v: string) => {
    if (tagList.includes(v)) {
      Message.error('当前值已存在');
      return;
    }
    setTagList([...tagList, v]);
    setInputValue('');
  };

  const removeTag = (key: string) => {
    const removeIndex = tagList.findIndex((item) => item === key);
    const tempList = [...tagList];
    tempList.splice(removeIndex, 1);
    setTagList(tempList);
  };

  const updateTag = (prev: string, current: string) => {
    const index = tagList.findIndex((item) => item === prev);
    const tempList = [...tagList];
    tempList[index] = current;
    setTagList(tempList);
    setInputValue('');
    setIsEdit('');
  };

  return (
    <S.CategoryInputWraper style={style} className={className} ref={wrapperRef}>
      <Space wrap ref={tagWrapperRef}>
        {tagList.map((item) => {
          if (isEdit === item) {
            return (
              <S.CategoryInput
                key={item}
                style={{ border: '1px solid red', padding: 2 }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(evenv) => {
                  if (evenv.key === 'Enter') {
                    updateTag(item, inputValue);
                  }
                }}
              />
            );
          }
          return (
            <Tag
              key={item}
              closable
              className={`category-tag-${item}`}
              onClick={(e) => {
                setIsEdit(item);
                setInputValue(item);
                getPositionX('edit', `category-tag-${item}`);
                console.log(wrapperRef);
                console.log(e);
              }}
              onClose={() => removeTag(item)}
            >
              {item}
            </Tag>
          );
        })}
        {!isEdit && (
          <S.CategoryInput
            ref={inputRef as any}
            onFocus={() => {
              getPositionX('add');
            }}
            style={{ border: '1px solid red' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(evenv) => {
              if (evenv.key === 'Enter') {
                addTag(inputValue);
              }
              getPositionX('add');
            }}
          />
        )}
      </Space>
    </S.CategoryInputWraper>
  );
};

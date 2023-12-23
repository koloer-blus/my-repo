import { ICategorySearchProps } from 'repo-components/CategorySearch/types';

/**
 * 以番剧搜索为例
 */
export const CustomSelectMock: ICategorySearchProps['data'] = [
  {
    field: 'area',
    label: '地区',
    fieldComponentType: 'Select',
    options: [
      {
        label: '日本',
        value: 'Japan'
      },
      {
        label: '中国',
        value: 'China'
      },
      {
        label: '欧美',
        value: 'Europe&America'
      }
    ]
  },
  {
    field: 'type',
    label: '类型',
    fieldComponentType: 'Checkbox',
    options: [
      {
        label: '搞笑',
        value: 'funny'
      },
      {
        label: '励志',
        value: 'inspirational'
      },
      {
        label: '战斗',
        value: 'fighting'
      },
      {
        label: '🈲18',
        value: '18_prohibited',
        disabled: true
      },
      {
        label: '校园',
        value: 'campus'
      },
      {
        label: '爱情',
        value: 'love'
      },
      {
        label: '冒险',
        value: 'adventure'
      }
    ]
  },
  {
    field: 'status',
    label: '状态',
    fieldComponentType: 'Radio',
    options: [
      {
        label: '已完结',
        value: 'closed'
      },
      {
        label: '本月新番',
        value: 'latest'
      },
      {
        label: '长期连载',
        value: 'forver'
      }
    ]
  },
  {
    field: 'version',
    label: '版本类型',
    fieldComponentType: 'Select',
    options: [
      {
        label: 'TV',
        value: 'TV'
      },
      {
        label: '剧场版',
        value: 'movie'
      },
      {
        label: 'OVA',
        value: 'OVA',
        disabled: true
      }
    ]
  },
  {
    field: 'duration',
    label: '更新时间',
    fieldComponentType: 'DateRangerPicker'
  },
  {
    field: 'create',
    label: '创建时间',
    fieldComponentType: 'DatePicker'
  },
  {
    field: 'keyword',
    label: '关键词',
    fieldComponentType: 'Input'
  }
];

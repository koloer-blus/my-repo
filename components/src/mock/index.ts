import { ICategorySearchTagItem } from "../components/custom-search/types";

export const CustomSelectMock: ICategorySearchTagItem[] = [{
    label: '组织城市',
    field: 'city',
    type: 'Cascader',
    options: [
        {
            value: 'beijing',
            label: 'Beijing',
            children: [
                {
                    value: 'Beijing',
                    label: 'Beijing',
                    children: [
                        {
                            value: 'chaoyang',
                            label: 'Chaoyang',
                            children: [
                                {
                                    value: 'datunli',
                                    label: 'Datunli',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            value: 'shanghai',
            label: 'Shanghai',
            children: [
                {
                    value: 'shanghaishi',
                    label: 'Shanghai',
                    children: [
                        {
                            value: 'huangpu',
                            label: 'Huangpu',
                        },
                    ],
                },
            ],
        },
    ]
}, {
    label: '组名',
    field: 'group',
    type: 'Select',
    options: [
        {
            label: 'group1',
            value: 'group1'
        },
        {
            label: 'group2',
            value: 'group2'
        }
    ]
}, {
    label: '文件',
    field: 'file',
    type: 'Input',
}, {
    label: '文件类型',
    field: 'fileType',
    type: 'Radio',
    options: [
        [
            {
                label: 'A',
                value: 'a',
            },
            {
                label: 'B',
                value: 'b',
            },
            {
                label: 'C',
                value: 'c',
            },
            {
                label: 'D',
                value: 'd',
                disabled: true,
            },
        ]
    ]
}, {
    label: '文件 Tag',
    field: 'fileTag',
    type: 'CheckBox',
    options: [
        {
            label: 'Option 1',
            value: '1',
        },
        {
            label: 'Option 2',
            value: '2',
            disabled: true,
        },
        {
            label: 'Option 3',
            value: '3',
        },
        {
            label: 'Option 4',
            value: '4',
        },
    ]
}, {
    label: '创建日期',
    field: 'date',
    type: 'DatePiacker',
}, {
    label: '最后更新时间',
    field: 'time',
    type: 'TimePicker'
}]
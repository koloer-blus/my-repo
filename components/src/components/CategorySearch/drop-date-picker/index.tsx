import {IBaseDropComponentProps} from "../types.ts";
import { DatePicker } from '@arco-design/web-react';

interface  IDropDatePickerProps extends IBaseDropComponentProps {
    mode: 'normal' | 'ranger';
}

export const DropDatePicker = (props: IDropDatePickerProps) => {
    const { mode, value, onChange } = props;
   
    if (mode === 'normal') {
        return (
            <DatePicker
                triggerElement={null}
                style={{ width: 268 }}
                value={value as string}
                onChange={(v) => onChange(v)}
            />
        )
    }
    return  (
        <DatePicker.RangePicker
            triggerElement={null}
            style={{ width: 560, marginTop: 20 }}
            value={value as string[]}
            onChange={(v) => onChange(v)}
        />
    )
    
}
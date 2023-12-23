import { ICategoryDataItem, TCategoryValue, TChangeFieldValue, TUserActionType } from '../../types';
import { getExistsCurrentFieldInValue } from '../../utils';
import { DatePannel } from './DatePannel';
import { SelectPannel } from './SelectPannel';

export const renderFieldDataDropPannel = ({
  fieldData,
  value = [],
  changeFieldValue
}: {
  fieldData?: ICategoryDataItem;
  value: TCategoryValue;
  changeFieldValue: TChangeFieldValue;
}) => {
  if (!fieldData) {
    return null;
  }

  const mode: TUserActionType = getExistsCurrentFieldInValue(fieldData.field, value) ? 'EDIT' : 'ADD';

  const currentFieldValue = value.find((item) => item.field === fieldData.field)?.value;

  if (fieldData.fieldComponentType === 'Custom' && fieldData?.renderDropPannel) {
    return fieldData.renderDropPannel({ data: fieldData, values: value, value, mode, changeFieldValue });
  }

  if (['DatePicker', 'DateRangerPicker'].includes(fieldData.fieldComponentType)) {
    return (
      <DatePannel
        value={currentFieldValue}
        type={fieldData.fieldComponentType === 'DatePicker' ? 'Date' : 'DateRanger'}
        changeFieldValue={changeFieldValue}
      />
    );
  }

  if (['Select', 'Radio', 'Checkbox', 'MultSelect'].includes(fieldData.fieldComponentType)) {
    const type = ['Select', 'Radio'].includes(fieldData.fieldComponentType) ? 'selectItem' : 'checkbox';
    return (
      <SelectPannel
        changeFieldValue={changeFieldValue}
        value={currentFieldValue}
        options={fieldData.options}
        mode={type}
      />
    );
  }

  return null;
};

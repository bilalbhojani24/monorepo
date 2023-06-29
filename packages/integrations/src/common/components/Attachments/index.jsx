import React from 'react';
import { Button, MdDeleteOutline } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from '../Label';
import { FieldType } from '../types';

const Attachments = ({
  schema,
  label,
  required,
  fieldKey,
  attachments,
  setAttachments
}) => {
  if (!attachments?.length) return null;

  const handleDelete = () => {
    setAttachments([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDelete();
    }
  };

  const isAttachmentABLOB = attachments[0] instanceof Blob;
  const imgSrc = isAttachmentABLOB
    ? URL.createObjectURL(attachments[0])
    : attachments[0];
  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <Label required={required} label={label} />
      <div className="border-base-300 flex overflow-hidden rounded-md border">
        <img className="h-14 w-14" src={imgSrc} alt="attachment" />
        <div className="flex w-full flex-1 items-center px-4 py-2">
          <div className="w-full text-sm">
            {isAttachmentABLOB && <p>{attachments[0].name}</p>}
          </div>
          <Button
            tabIndex={0}
            ariaLabel="delete-attachment"
            wrapperClassName="hover:bg-inherit border-0 shadow-none bg-inherit p-0"
            colors="white"
            icon={<MdDeleteOutline className="text-base-400 gap-0 text-2xl" />}
            onClick={handleDelete}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

Attachments.propTypes = {
  ...FieldType,
  attachments: PropTypes.arrayOf(PropTypes.string),
  setAttachments: PropTypes.func
};

Attachments.defaultProps = {
  attachments: [],
  setAttachments: () => {}
};

export default Attachments;

import React from 'react';
import { MdDeleteOutline } from '@browserstack/bifrost';

import Label from '../Label';

const Attachment = ({ required, label, attachments, setAttachments }) => {
  if (!attachments?.length) return null;

  const handleDelete = () => {
    setAttachments([]);
  };

  const isAttachmentABLOB = attachments[0] instanceof Blob;
  const imgSrc = isAttachmentABLOB
    ? URL.createObjectURL(attachments[0])
    : attachments[0];
  return (
    <div className="py-3">
      <Label required={required} label={label} />
      <div className="border-base-300 flex overflow-hidden rounded-md border">
        <img className="h-14 w-14" src={imgSrc} alt="attachment" />
        <div className="flex w-full flex-1 items-center px-4 py-2">
          <div className="w-full text-sm">
            {isAttachmentABLOB && <p>{attachments[0].name}</p>}
          </div>
          <MdDeleteOutline
            className="text-base-400 text-3xl"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Attachment;

import React from 'react';
import { MdDeleteOutline } from '@browserstack/bifrost';

import Label from '../Label';

const Attachment = ({ required, label, attachment }) => {
  const isAttachmentABLOB = attachment instanceof Blob;
  const imgSrc = isAttachmentABLOB
    ? URL.createObjectURL(attachment)
    : attachment;
  return (
    <>
      <Label required={required} label={label} />
      <div className="border-base-300 flex overflow-hidden rounded-md border">
        <img className="h-14 w-14" src={imgSrc} alt="attachment" />
        <div className="flex">
          <div className="text-sm">
            {isAttachmentABLOB && <p>{attachment.name}</p>}
            {/* <p className="text-base-400">Time stamp</p> */}
          </div>
          <MdDeleteOutline className="text-base-400 text-3xl" />
        </div>
      </div>
    </>
  );
};

export default Attachment;

/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import {
  AiFillFileText,
  AiFillPlayCircle,
  BsExclamationTriangleFill,
  MdPictureAsPdf
} from '../Icon';
import Loader from '../Loader';
import Tooltip from '../Tooltip';

import {
  MEDIA_CARD_STATUS,
  MEDIA_CARD_THUMBNAIL_RATIO
} from './const/GalleryMediaConstants';

const GalleryMedia = ({
  thumbnail,
  title,
  subTitle,
  icon,
  status,
  ratio,
  showExtensions,
  multiSelect,
  selected,
  onSelect
}) => {
  const [checkBoxVisisble, setCheckBoxVisisble] = useState(false);
  const [checkBoxChecked, setCheckBoxChecked] = useState(selected);

  const handleChange = (e) => {
    onSelect(e);
    setCheckBoxChecked(e.target.checked);
  };

  const renderMediaThumbnail = () => {
    switch (status) {
      case MEDIA_CARD_STATUS[0]:
        return (
          <div
            className={twClassNames(
              `bg-cover bg-no-repeat ${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`
            )}
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        );
      case MEDIA_CARD_STATUS[1]:
        return (
          <div className={twClassNames(`${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`)}>
            <BsExclamationTriangleFill
              className="text-base-700 mx-auto flex h-full w-6 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[2]:
        return (
          <div
            className={twClassNames(`${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`, {
              'flex justify-center': status === MEDIA_CARD_STATUS[2]
            })}
          >
            <Loader
              width="w-6"
              wrapperClassName="text-base-900 mx-1.5 flex h-full"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[3]:
        return (
          <div
            className={`bg-cover bg-no-repeat ${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`}
            style={{ backgroundImage: `url(${thumbnail})` }}
          >
            <AiFillPlayCircle
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[4]:
        return (
          <div className={`${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`}>
            <MdPictureAsPdf
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[5]:
        return (
          <div className={`${MEDIA_CARD_THUMBNAIL_RATIO[ratio]}`}>
            <AiFillFileText
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      default:
        return (
          <div
            className={`${MEDIA_CARD_THUMBNAIL_RATIO[ratio]} text-base-900 text-lg font-normal leading-none`}
          >
            Unsupported File format
          </div>
        );
    }
  };

  const renderFileWithExtension = () => {
    const extension = title.split('.').slice(-1);
    const effectiveTitle = title.split('.').slice(0, -1).join('.');
    return effectiveTitle.length < 18 ? (
      `${effectiveTitle}.${extension}`
    ) : (
      <Tooltip
        theme="dark"
        content={
          <p className="text-base-300 px-4 text-sm font-normal leading-5">{`${effectiveTitle}.${extension}`}</p>
        }
      >{`${effectiveTitle.slice(0, 18)}...${extension}`}</Tooltip>
    );
  };

  const renderFileWithoutExtension = () => {
    const effectiveTitle = title.split('.').slice(0, -1).join('.');
    return effectiveTitle.length < 20 ? (
      effectiveTitle
    ) : (
      <Tooltip
        theme="dark"
        content={
          <p className="text-base-300 px-4 text-sm font-normal leading-5">
            {effectiveTitle}
          </p>
        }
      >
        {`${effectiveTitle.slice(0, 20)}...`}
      </Tooltip>
    );
  };

  return (
    <div className="w-[197px]">
      <button
        className={twClassNames(
          'border-base-300 outline-brand-500 relative w-full rounded-md border outline-2 outline-offset-4 hover:opacity-80',
          {
            'border-brand-500 border-2 rounded': checkBoxChecked
          }
        )}
        onMouseEnter={() => {
          setCheckBoxVisisble(true);
        }}
        onMouseLeave={() => {
          setCheckBoxVisisble(false);
        }}
        onFocus={() => {
          setCheckBoxVisisble(true);
        }}
        type="button"
        aria-label="particular button"
      >
        {(checkBoxVisisble || multiSelect || checkBoxChecked) && (
          <Checkbox
            checked={checkBoxChecked}
            border={false}
            onChange={(e) => handleChange(e)}
            onBlur={() => {
              setCheckBoxVisisble(false);
            }}
            wrapperClassName="absolute right-3 top-2"
          />
        )}
        {renderMediaThumbnail()}
      </button>
      <div
        className={twClassNames('mt-4 flex justify-between', {
          'mt-[15px]': checkBoxChecked
        })}
      >
        <div>
          {title && (
            <p className="text-base-900 text-sm font-normal leading-none">
              {showExtensions
                ? renderFileWithExtension()
                : renderFileWithoutExtension()}
            </p>
          )}
          {subTitle && (
            <p className="text-base-500 mt-2 text-xs font-medium leading-4">
              {subTitle}
            </p>
          )}
        </div>
        {icon}
      </div>
    </div>
  );
};

GalleryMedia.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.node,
  status: PropTypes.oneOf(MEDIA_CARD_STATUS),
  ratio: PropTypes.string,
  showExtensions: PropTypes.bool,
  multiSelect: PropTypes.bool,
  selected: PropTypes.bool,
  onSelect: PropTypes.func
};
GalleryMedia.defaultProps = {
  thumbnail: 'https://rb.gy/3b4b0',
  title: '',
  subTitle: '',
  icon: null,
  status: MEDIA_CARD_STATUS[0],
  ratio: '16/9',
  showExtensions: false,
  multiSelect: false,
  selected: false,
  onSelect: () => {}
};

export default GalleryMedia;

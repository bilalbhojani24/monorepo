import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import {
  AiFillFileText,
  AiFillPlayCircle,
  BsExclamationTriangleFill,
  MdPictureAsPdf
} from '../Icon';
import Loader from '../Loader';
// import Tooltip from '../Tooltip';
import TruncateText from '../TruncateText';

import GalleryMediaCheckbox from './components/GalleryMediaCheckbox';
import {
  MEDIA_CARD_STATUS,
  MEDIA_CARD_THUMBNAIL_RATIO
} from './const/GalleryMediaConstants';

const GalleryMedia = ({
  data,
  ratio,
  showExtensions,
  checkboxAlwaysVisible,
  onChange,
  onCardClick,
  ratioConfig,
  wrapperClassName
}) => {
  const renderMediaThumbnail = (item) => {
    const { status, file } = item;
    switch (status) {
      case MEDIA_CARD_STATUS[0]:
        return (
          <div
            className={twClassNames(
              `bg-cover bg-no-repeat ${ratioConfig[ratio].split(' ')[0]}`
            )}
            style={{ backgroundImage: `url(${file})` }}
          />
        );
      case MEDIA_CARD_STATUS[1]:
        return (
          <div className={twClassNames(`${ratioConfig[ratio].split(' ')[0]}`)}>
            <BsExclamationTriangleFill
              className="text-base-700 mx-auto flex h-full w-6 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[2]:
        return (
          <div
            className={twClassNames(`${ratioConfig[ratio].split(' ')[0]}`, {
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
            className={`bg-cover bg-no-repeat ${
              ratioConfig[ratio].split(' ')[0]
            }`}
            style={{ backgroundImage: `url(${file})` }}
          >
            <AiFillPlayCircle
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[4]:
        return (
          <div className={`${ratioConfig[ratio].split(' ')[0]}`}>
            <MdPictureAsPdf
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      case MEDIA_CARD_STATUS[5]:
        return (
          <div className={`${ratioConfig[ratio].split(' ')[0]}`}>
            <AiFillFileText
              className="text-base-700 mx-auto flex h-full w-8 flex-col"
              aria-hidden="true"
            />
          </div>
        );
      default:
        return (
          <div
            className={`${
              ratioConfig[ratio].split(' ')[0]
            } text-base-900 text-lg font-normal leading-none`}
          >
            Unsupported format
          </div>
        );
    }
  };

  const renderFileWithExtension = (title) => {
    const extension = title.split('.').slice(-1);
    const effectiveTitle = title.split('.').slice(0, -1).join('.');
    return effectiveTitle.length < 18 ? (
      `${effectiveTitle}.${extension}`
    ) : (
      <TruncateText isFullWidthTooltip>
        {`${effectiveTitle.slice(0, 18)}...${extension}`}
      </TruncateText>
    );
  };

  const renderFileWithoutExtension = (title) => {
    const effectiveTitle = title.split('.').slice(0, -1).join('.');
    return effectiveTitle.length < 20 ? (
      effectiveTitle
    ) : (
      <TruncateText isFullWidthTooltip>
        {`${effectiveTitle.slice(0, 20)}...`}
      </TruncateText>
    );
  };

  const handleOnClick = (id) => {
    onCardClick(id);
  };

  const handleChange = (e, itemId) => {
    onChange(e.target.checked, itemId);
  };

  return (
    <div className={wrapperClassName}>
      {data.map((mediaItem) => (
        <div
          key={mediaItem.id}
          className={`mx-auto ${ratioConfig[ratio].split(' ')[1]}`}
        >
          <GalleryMediaCheckbox
            data={{
              label: mediaItem.id,
              value: mediaItem.file,
              title: mediaItem.title
            }}
            onClick={() => handleOnClick(mediaItem.id)}
            selected={mediaItem.selected}
            checkboxAlwaysVisible={checkboxAlwaysVisible}
            onChange={(e) => handleChange(e, mediaItem.id)}
          >
            {renderMediaThumbnail(mediaItem)}
          </GalleryMediaCheckbox>

          <div className="mt-4 flex justify-between">
            <div className="grow-0">
              {mediaItem.title && (
                <p className="text-base-900 text-sm font-normal leading-none">
                  {showExtensions
                    ? renderFileWithExtension(mediaItem.title)
                    : renderFileWithoutExtension(mediaItem.title)}
                </p>
              )}
              {mediaItem.subTitle && (
                <p className="text-base-500 mt-2 text-xs font-medium leading-4">
                  {mediaItem.subTitle}
                </p>
              )}
            </div>
            {mediaItem.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

GalleryMedia.propTypes = {
  ratio: PropTypes.string,
  showExtensions: PropTypes.bool,
  checkboxAlwaysVisible: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  onChange: PropTypes.func,
  onCardClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
      title: PropTypes.string,
      subTitle: PropTypes.string,
      icon: PropTypes.node,
      status: PropTypes.oneOf(MEDIA_CARD_STATUS),
      id: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  ratioConfig: PropTypes.shape({
    '16/9': PropTypes.string,
    '3/2': PropTypes.string,
    '4/3': PropTypes.string,
    '1/1': PropTypes.string
  })
};
GalleryMedia.defaultProps = {
  data: [],
  ratio: '16/9',
  showExtensions: false,
  onChange: () => {},
  onCardClick: () => {},
  checkboxAlwaysVisible: false,
  wrapperClassName: '',
  ratioConfig: MEDIA_CARD_THUMBNAIL_RATIO
};

export default GalleryMedia;

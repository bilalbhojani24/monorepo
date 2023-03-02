import React, { useState } from 'react';
import {
  TMBadge,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const ClampedTags = ({ tagsArray, badgeModifier }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {tagsArray.length > 0 ? (
        <div className="mt-1 flex gap-1">
          <TMBadge
            text={tagsArray[0]}
            size="large"
            modifier={badgeModifier}
            wrapperClassName="pointer-events-none"
            key={tagsArray[0]}
          />
          {tagsArray.length > 2 ? (
            <TMBadge
              modifier={badgeModifier}
              text={`+${tagsArray.length - 1} tags`}
              size="large"
              key={`+${tagsArray.length - 1}`}
              onClick={() => setShowModal(true)}
            />
          ) : (
            tagsArray.length > 1 && (
              <TMBadge
                text={tagsArray[1]}
                size="large"
                wrapperClassName="pointer-events-none"
                modifier={badgeModifier}
                key={tagsArray[1]}
              />
            )
          )}

          <TMModal show={showModal} onOverlayClick={() => setShowModal(false)}>
            <TMModalHeader
              heading="Linked Tags"
              handleDismissClick={() => setShowModal(false)}
            />
            <TMModalBody>
              <p className="text-base-600 mb-4 text-sm">
                Here are all the tags linked to this test run:
              </p>
              <div className="flex flex-wrap gap-4">
                {tagsArray.map((item) => (
                  <TMBadge
                    text={item}
                    size="large"
                    wrapperClassName="pointer-events-none"
                    key={item}
                  />
                ))}
              </div>
            </TMModalBody>
            <TMModalFooter position="right">
              <TMButton
                variant="primary"
                colors="white"
                onClick={() => setShowModal(false)}
              >
                Close
              </TMButton>
            </TMModalFooter>
          </TMModal>
        </div>
      ) : (
        '--'
      )}
    </>
  );
};

ClampedTags.propTypes = {
  tagsArray: PropTypes.arrayOf([PropTypes.string]),
  badgeModifier: PropTypes.string
};

ClampedTags.defaultProps = {
  tagsArray: [],
  badgeModifier: 'primary'
};

export default ClampedTags;

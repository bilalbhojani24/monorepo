import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheck } from '@browserstack/bifrost';
import bgIllustration from 'assets/illustrations/bg-illustration.png';
import confetti from 'canvas-confetti';
import { O11yButton, O11yModal, O11yModalBody } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { canStartFreeTrial } from 'globalSlice/selectors';

import { MODAL_CONFIG } from '../constants';

function UpgradeModal() {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const modalData = useSelector(getModalData);
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial());
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSubmitFreeTrial = () => {
    if (canvasRef.current) {
      canvasRef.current.confetti = confetti.create(canvasRef.current, {
        resize: true
      });
      canvasRef.current.confetti({
        particleCount: 400,
        spread: 120,
        startVelocity: 40,
        origin: {
          x: 1,
          y: 0.7
        }
      });
      canvasRef.current.confetti({
        particleCount: 400,
        spread: 120,
        startVelocity: 40,
        origin: {
          x: 0,
          y: 0.7
        }
      });
    }
  };

  return (
    <O11yModal
      show
      size="md"
      onClose={handleCloseModal}
      wrapperClassName="max-h-[90vh]"
    >
      <O11yModalBody>
        <section className="relative flex flex-col py-6">
          <section className="relative flex h-64 items-end">
            <img
              src={bgIllustration}
              alt=""
              className="absolute left-0 top-0 h-full w-full"
            />
            <img
              src={
                MODAL_CONFIG?.[modalData?.featureKey]?.img ||
                MODAL_CONFIG.common.img
              }
              alt="showing product features"
              className="relative w-full"
            />
          </section>
          <section className="flex w-full flex-col">
            <p className="text-base-900 pt-5 text-center text-lg font-medium">
              Upgrade to pro
            </p>
            <p className="text-base-500 mt-2 text-center text-sm leading-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
              aliquam laudantium explicabo pariatur iste dolorem animi vitae
              error totam. At sapiente aliquam accusamus facere veritatis.{' '}
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <MdCheck className="text-success-700 shrink-0 text-base" />
                <span className="text-xs font-medium">
                  Track important metrics like Build stability and Build
                  performance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MdCheck className="text-success-700 shrink-0 text-base" />
                <span className="text-xs font-medium">
                  Set warning and critical condition for your alerts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MdCheck className="text-success-700 shrink-0 text-base" />
                <span className="text-xs font-medium">
                  Track important metrics like Build stability and Build
                  performance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MdCheck className="text-success-700 shrink-0 text-base" />
                <span className="text-xs font-medium">
                  Set warning and critical condition for your alerts
                </span>
              </li>
            </ul>
          </section>
          <section className="mt-6 flex items-center gap-3">
            <O11yButton
              colors="white"
              wrapperClassName="flex-1"
              onClick={handleCloseModal}
            >
              Cancel
            </O11yButton>
            {shouldAllowFreeTrial ? (
              <O11yButton
                colors="success"
                wrapperClassName="flex-1"
                onClick={handleSubmitFreeTrial}
              >
                Get a 14-day free trial
              </O11yButton>
            ) : (
              <O11yButton wrapperClassName="flex-1">Upgrade</O11yButton>
            )}
          </section>
          <canvas
            className="pointer-events-none absolute left-0 top-0 h-full w-full"
            ref={canvasRef}
          />
        </section>
      </O11yModalBody>
    </O11yModal>
  );
}

export default UpgradeModal;

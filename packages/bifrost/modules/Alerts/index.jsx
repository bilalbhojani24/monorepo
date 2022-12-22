import React, { Fragment } from "react";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { ALERT_LINK_POSITION, ALERT_MODIFIER } from "./const/alertConstants";
// import { InformationCircleIcon } from "../Icon";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from "../Icon";
import "./styles.scss";

const link = (
  alertLinkPosition,
  modifier,
  handleLinkClick,
  linkUrl,
  linkText
) => {
  if (linkText?.length > 0)
    return (
      <a
        href="/"
        className={classNames("h-fit", {
          "underline ml-1": alertLinkPosition === ALERT_LINK_POSITION[0],
          "text-gray-700 hover:text-gray-600": modifier === ALERT_MODIFIER[0],
          "text-blue-700 hover:text-blue-600": modifier === ALERT_MODIFIER[1],
          "text-green-700 hover:text-green-600": modifier === ALERT_MODIFIER[2],
          "text-red-700 hover:text-red-600": modifier === ALERT_MODIFIER[3],
          "text-yellow-700 hover:text-yellow-600":
            modifier === ALERT_MODIFIER[4],
        })}
        onClick={(event) => {
          event.preventDefault();
          if (handleLinkClick) handleLinkClick(linkUrl);
        }}
      >
        {linkText}
        <span aria-hidden="true"> &rarr;</span>
      </a>
    );
};

const Alerts = (props) => {
  const {
    accentBorder,
    alertLinkPosition,
    handleLinkClick,
    linkText,
    linkUrl,
    show,
    description,
    textColorClass,
    modifier,
    title,
  } = props;

  const renderAlertIcon = (modifier) => {
    switch (modifier) {
      case ALERT_MODIFIER[0]:
        return (
          <InformationCircleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
      case ALERT_MODIFIER[1]:
        return (
          <InformationCircleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
      case ALERT_MODIFIER[2]:
        return (
          <CheckCircleIcon className={iconClassTypes} aria-hidden="true" />
        );
      case ALERT_MODIFIER[3]:
        return <XCircleIcon className={iconClassTypes} aria-hidden="true" />;
      case ALERT_MODIFIER[4]:
        return (
          <ExclamationTriangleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
      default:
        return (
          <InformationCircleIcon
            className={iconClassTypes}
            aria-hidden="true"
          />
        );
    }
  };

  const iconClassTypes = classNames("h-5 w-5 ", {
    "text-gray-400": modifier === ALERT_MODIFIER[0],
    "text-blue-400": modifier === ALERT_MODIFIER[1],
    "text-green-400": modifier === ALERT_MODIFIER[2],
    "text-red-400": modifier === ALERT_MODIFIER[3],
    "text-yellow-400": modifier === ALERT_MODIFIER[4],
  });

  return (
    <>
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={classNames(`p-4`, {
            "rounded-md ": !accentBorder,

            "border-l-4 border-gray-400":
              accentBorder && modifier === ALERT_MODIFIER[0],
            "border-l-4 border-blue-400":
              accentBorder && modifier === ALERT_MODIFIER[1],
            "border-l-4 border-green-400":
              accentBorder && modifier === ALERT_MODIFIER[2],
            "border-l-4 border-red-400":
              accentBorder && modifier === ALERT_MODIFIER[3],
            "border-l-4 border-yellow-400":
              accentBorder && modifier === ALERT_MODIFIER[4],

            "bg-gray-50": modifier === ALERT_MODIFIER[0],
            "bg-blue-50": modifier === ALERT_MODIFIER[1],
            "bg-green-50": modifier === ALERT_MODIFIER[2],
            "bg-red-50": modifier === ALERT_MODIFIER[3],
            "bg-yellow-50": modifier === ALERT_MODIFIER[4],
          })}
        >
          <div className="flex">
            <div className="flex-shrink-0">{renderAlertIcon(modifier)}</div>
            <div className="ml-3 flex-1 md:flex md:justify-between items-end">
              <div>
                {title?.length > 0 && (
                  <h3
                    className={classNames("text-sm font-medium", {
                      "text-gray-800": modifier === ALERT_MODIFIER[0],
                      "text-blue-800": modifier === ALERT_MODIFIER[1],
                      "text-green-800": modifier === ALERT_MODIFIER[2],
                      "text-red-800": modifier === ALERT_MODIFIER[3],
                      "text-yellow-800": modifier === ALERT_MODIFIER[4],
                    })}
                  >
                    {title}
                  </h3>
                )}
                <span
                  className={classNames(
                    `text-sm flex items-end ${textColorClass}`,
                    {
                      "text-gray-700": modifier === ALERT_MODIFIER[0],
                      "text-blue-700": modifier === ALERT_MODIFIER[1],
                      "text-green-700": modifier === ALERT_MODIFIER[2],
                      "text-red-700": modifier === ALERT_MODIFIER[3],
                      "text-yellow-700": modifier === ALERT_MODIFIER[4],
                    }
                  )}
                >
                  {typeof description === "object" ? (
                    <div className="mt-2 text-sm">
                      <ul role="list" className="list-disc space-y-1 pl-5">
                        {description?.map((descriptionItem, index) => {
                          return (
                            <li key={`${descriptionItem}-${index}`}>
                              {descriptionItem}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <p>{description} </p>
                  )}

                  {alertLinkPosition === ALERT_LINK_POSITION[0] &&
                    link(
                      alertLinkPosition,
                      modifier,
                      handleLinkClick,
                      linkUrl,
                      linkText
                    )}
                </span>
                
              </div>
              <p className="mt-3 text-sm md:mt-0 md:ml-6 h-fit">
                {alertLinkPosition === ALERT_LINK_POSITION[1] &&
                  link(
                    alertLinkPosition,
                    modifier,
                    handleLinkClick,
                    linkUrl,
                    linkText
                  )}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

Alerts.propTypes = {
  accentBorder: PropTypes.bool,
  AlertIcon: PropTypes.elementType,
  alertLinkPosition: PropTypes.oneOf(Object.values(ALERT_LINK_POSITION)),
  handleLinkClick: PropTypes.func,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  show: PropTypes.bool,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  modifier: PropTypes.string,
  title: PropTypes.string,
};
Alerts.defaultProps = {
  accentBorder: false,
  AlertIcon: InformationCircleIcon,
  alertLinkPosition: "end",
  handleLinkClick: () => {},
  linkText: "Details",
  linkUrl: "/",
  show: true,
  description: "",
  modifier: ALERT_MODIFIER[0],
  title: "",
};

// Alerts.propTypes = {
//   description: (props, propName) => {
//     if(typeof props.propName !== "string" && props.title === ""){
//       return new Error(`${propName} can only be of type string if no value is assigned to 'title' prop`)
//     }
//   },
// }

export default Alerts;

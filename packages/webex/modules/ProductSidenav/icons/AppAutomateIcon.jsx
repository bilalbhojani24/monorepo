import React from 'react';
import PropTypes from 'prop-types';

const AccesssibilityIcon = ({ iconClass, iconColor }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={iconColor || '#374151'}
    xmlns="http://www.w3.org/2000/svg"
    className={iconClass}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 15V15.75C7.5 16.1642 7.83577 16.5 8.25 16.5H9.75V14.25H9V6.75H14.25V9H15.75V5.25C15.75 4.83579 15.4142 4.5 15 4.5H10.5V2.25C10.5 1.83579 10.1642 1.5 9.75 1.5H3C2.58579 1.5 2.25 1.83579 2.25 2.25V14.25C2.25 14.6642 2.58578 15 3 15H7.5ZM3.75 12.75V3.75H9V4.5H8.25C7.83577 4.5 7.5 4.83579 7.5 5.25V12.75H3.75ZM17.1173 14.6172C17.1334 14.5 17.1414 14.3789 17.1414 14.25C17.1414 14.125 17.1334 14 17.1133 13.8828L17.9285 13.2656C18.0008 13.2109 18.0208 13.1055 17.9767 13.0274L17.2057 11.7304C17.1574 11.6445 17.0571 11.6172 16.9687 11.6445L16.009 12.0195C15.8081 11.8711 15.5953 11.7461 15.3583 11.6524L15.2138 10.6601C15.1978 10.5664 15.1174 10.5 15.0211 10.5H13.4789C13.3825 10.5 13.3063 10.5664 13.2902 10.6601L13.1456 11.6524C12.9087 11.7461 12.6919 11.875 12.4951 12.0195L11.5353 11.6445C11.4469 11.6133 11.3465 11.6445 11.2984 11.7304L10.5313 13.0274C10.4831 13.1094 10.4992 13.2109 10.5795 13.2656L11.3947 13.8828C11.3746 14 11.3586 14.1289 11.3586 14.25C11.3586 14.3711 11.3666 14.5 11.3867 14.6172L10.5715 15.2344C10.4992 15.2891 10.4791 15.3945 10.5233 15.4726L11.2943 16.7696C11.3425 16.8555 11.4429 16.8828 11.5312 16.8555L12.491 16.4805C12.6919 16.6289 12.9047 16.7539 13.1416 16.8476L13.2862 17.8399C13.3063 17.9336 13.3825 18 13.4789 18H15.0211C15.1174 18 15.1978 17.9336 15.2098 17.8399L15.3544 16.8476C15.5913 16.7539 15.8081 16.6289 16.0049 16.4805L16.9647 16.8555C17.053 16.8867 17.1535 16.8555 17.2016 16.7696L17.9727 15.4726C18.0208 15.3867 18.0008 15.2891 17.9245 15.2344L17.1173 14.6172ZM14.25 15.6562C13.4548 15.6562 12.8043 15.0234 12.8043 14.25C12.8043 13.4766 13.4548 12.8438 14.25 12.8438C15.0451 12.8438 15.6957 13.4766 15.6957 14.25C15.6957 15.0234 15.0451 15.6562 14.25 15.6562Z"
    />
  </svg>
);

AccesssibilityIcon.propTypes = {
  iconClass: PropTypes.string,
  iconColor: PropTypes.string
};
AccesssibilityIcon.defaultProps = {
  iconClass: '',
  iconColor: ''
};

export default AccesssibilityIcon;
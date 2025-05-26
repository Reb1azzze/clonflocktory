import React from 'react';
import Icon from '@ant-design/icons';
import "./PhoneFilled.css";

const UserFilledSvg = () => (
    <svg className='phone-svg' viewBox="0 0 27 27" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.60422 0H7.4723L10.2744 9.34037L7.4723 11.2084C7.4723 14.9446 11.2084 18.6807 14.9446 18.6807L16.8127 15.8786L26.153 18.6807V20.5488C26.153 22.0351 25.5626 23.4606 24.5116 24.5116C23.4606 25.5626 22.0351 26.153 20.5488 26.153C7.4723 26.153 0 16.8127 0 5.60422C0 4.11789 0.590443 2.69243 1.64144 1.64144C2.69243 0.590443 4.11789 0 5.60422 0Z"/>
    </svg>

);

const UserFilled = (props: any) => <Icon component={UserFilledSvg} {...props} />;

export default UserFilled;
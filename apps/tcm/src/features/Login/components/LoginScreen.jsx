import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = (props) => {
  const [loginUrl, setLoginUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://teststack.bsstag.com/api/v1')
      .then((data) => {
        if (data.response.data.data.login_url)
          setLoginUrl(data.response.data.data.login_url);
        else navigate('/projects');
      })
      .catch((data) => {
        if (data.response.data.data.login_url)
          setLoginUrl(data.response.data.data.login_url);
        else navigate('/projects');
      });
  }, [navigate]);

  const handleLoginClick = () => {
    window.location.href = loginUrl;
  };

  return loginUrl ? (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-brand-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:p-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block">Welcome to Test Case Management</span>
              </h2>
              <button
                type="button"
                onClick={handleLoginClick}
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-brand-600 shadow hover:bg-brand-50"
              >
                Login with BrowserStack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginScreen;

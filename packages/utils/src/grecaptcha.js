export const getGrecaptchaV3 = () => {
  const googleRecaptcha = document.querySelector('.g-recaptcha');
  const recaptchaSiteKey = googleRecaptcha?.dataset?.v3SiteKey;
  const { grecaptcha } = window;

  if (typeof grecaptcha !== 'undefined' && googleRecaptcha && recaptchaSiteKey) {
    return grecaptcha;
  }

  return null;
};

export const getGrecaptchaV3Token = async (action = 'signup') => {
  const googleRecaptcha = document.querySelector('.g-recaptcha');
  const recaptchaSiteKey = googleRecaptcha?.dataset?.v3SiteKey;
  const { grecaptcha } = window;
  if (typeof grecaptcha !== 'undefined' && googleRecaptcha && recaptchaSiteKey) {
    const token = await grecaptcha.execute(recaptchaSiteKey, { action });
    return token;
  }

  return null;
};

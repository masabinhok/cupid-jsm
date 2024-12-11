import speakeasy from 'speakeasy';

export const generateOTP = () =>{
  const secret = speakeasy.generateSecret().base32;
  const OTP = speakeasy.totp({
    secret, 
    encoding: 'base32',
    step: 60,
    digits: 6,
  });
  return {OTP, secret}
}

export const verifyOTP = (userToken, secret)=>{
  return speakeasy.totp.verify({
    secret, 
    encoding: 'base32',
    token: userToken,
    step: 60,
    window: 1,
  })
}
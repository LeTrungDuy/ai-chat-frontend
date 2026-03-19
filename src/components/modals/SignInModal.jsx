import { useState } from 'react';
import { Cross2Icon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import googleIcon from '../../assets/google-icon.svg';

const SignInModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // TODO: Integrate with Google Sign-In SDK
      // window.location.href = '/api/auth/google';
      console.log('Google Sign-In clicked');
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop + click-outside-to-close wrapper */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-8"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="bg-white rounded-2xl shadow-lg max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div />
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <Cross2Icon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Sign in to Unlock unlimited features
            </h1>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
              <span className="text-gray-700 font-medium">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email Sign-In Button (Optional - for future) */}
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <EnvelopeClosedIcon className="w-5 h-5" />
              Continue with Email
            </button>
          </div>

          {/* Footer Terms */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-600 leading-relaxed">
              By continuing, you agree to{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Template.net&apos;s Terms of use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInModal;

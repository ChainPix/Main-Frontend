'use client';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';
import { auth } from 'lib/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'service/userApi';

const provider = new GoogleAuthProvider();

function SignInDefault() {
  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { email, uid, displayName, photoURL } = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const idToken = credential.idToken;

        interface UserData {
          email: string;
          uid: string;
          idToken: string;
          displayName: string;
          photoURL: string;
        }

        const userData: UserData = {
          email,
          uid,
          idToken,
          displayName,
          photoURL,
        };
        interface AuthResult {
          token: string;
          userId: string;
          role: string;
          name: string;
          email: string;
          photoURL: string;
          organization: string;
        }
        let resultFromBackend: Promise<AuthResult>;
        resultFromBackend = signIn(userData);
        const { token: authToken, userId, role, name, organization } = await resultFromBackend;

        const cookieData = { authToken, userId, role, name, email, photoURL, organization };

        Object.entries(cookieData).forEach(([key, value]) => {
          Cookies.set(key, value, { expires: 1 });
        });
        window.location.href = '/admin/default';
      })
      .catch((error) => {
        console.error("Error with Google authentication:", error.code, error.message);
      });
  };

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <p className="mb-9 ml-1 text-base text-gray-600">
              Please use your <b>WealthOS gmail account!</b>
            </p>

            {/* Sign in section */}
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <button
              onClick={() => handleGoogleAuth()}
              className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:bg-lightPrimaryHover 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightPrimary dark:bg-navy-800 dark:text-white 
                         dark:hover:bg-navy-700"
            >
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <span className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </span>
            </button>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;

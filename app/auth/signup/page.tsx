"use client";
import { Header } from "@/components/layout/header";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-4">Join Our Platform</h2>
          <p className="text-center text-gray-600 mb-6 text-base">
            Continue with one of the providers below to create your account.
          </p>

          <div className="space-y-4">
            <button
            //make it naviagte to home page after sign in

              onClick={() => signIn("google" , { callbackUrl : "/"})  }
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-md py-2.5 text-sm font-semibold text-gray-700 hover:shadow-md transition"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <button
              onClick={() => signIn("github")}
              className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-md py-2.5 text-sm font-semibold hover:bg-gray-900 transition"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.85 10.91.57.1.77-.25.77-.55v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.12-3.1 0 0 .97-.31 3.18 1.2a11.03 11.03 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.51 3.17-1.2 3.17-1.2.65 1.62.25 2.8.12 3.1.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.26 5.7.42.37.8 1.1.8 2.22v3.29c0 .31.2.66.78.55A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"
                />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-green-700 font-semibold underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
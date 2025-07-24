"use client";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useState } from "react";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const sendEmail = async (data) => {
    try {
      await emailjs.send(
        "service_d9fi5h5", // EmailJS service ID
        "template_379ze2i", // EmailJS template ID
        data, // form data
        "JsYo5gWJhvJMfMTfm" // public key
      );
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
      reset(); // rest form fields after successful submission
    } catch (error) {
      console.error("FAILED...", error.text);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 4000);
    }
  };

  return (
    <section className="py-10">
      <h2 className="mb-4 text-center text-xl font-semibold">
        If you have any question, suggestion, or problem,
        <br />
        feel free to contact us.
      </h2>

      <form
        onSubmit={handleSubmit(sendEmail)}
        className="flex flex-col gap-4 items-center max-w-md mx-auto px-5"
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border p-3 rounded border-(--secondary)"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address.",
            },
          })}
          className="w-full border p-3 rounded border-(--secondary)"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <textarea
          placeholder="Message"
          {...register("message", { required: "This field is required." })}
          className="w-full border p-3 rounded min-h-[120px] border-(--secondary)"
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-(--secondary) text-white px-6 py-2 rounded hover:bg-(--primary) text-xl font-bold transition"
        >
          {isSubmitting ? "Sending.." : "Send"}
        </button>
      </form>
      {showSuccessToast && (
        <div
          id="toast-success"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800 absolute right-0 top-30 md:bottom-0 md:top-auto"
          role="alert"
        >
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            The email sent successfully.
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => setShowSuccessToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      {showErrorToast && (
        <div
          id="toast-danger"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800 absolute right-0 top-30 md:bottom-0 md:top-auto"
          role="alert"
        >
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            There was a problem,
            <br /> please try again later
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => setShowErrorToast(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div id="toast" className="hidden"></div>
    </section>
  );
}

export default Contact;

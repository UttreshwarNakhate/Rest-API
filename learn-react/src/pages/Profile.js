// profileFill.js
import React, { useState } from "react";
// import { useUser } from "../context/UserContext";
import Camera from "../components/Webcam";

function ProfileFill() {
//   const { addUserDetails } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [img, setImg] = useState();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    qualification: "",
    address: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // addUserDetails(form);

    // Create a FormData object and append form data
    const formData = new FormData();
    // formData.append("image", img);
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (img) {
      formData.append("image", img);
    }

    console.log("formData", formData)

    fetch("http://localhost:8000/single", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res.msg);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowPopup(true);
    setForm({
      name: "",
      mobile: "",
      email: "",
      age: "",
      qualification: "",
      address: "",
      image: "",
    });
    setImg(null); // Reset the image state as well
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="flex justify-center mx-auto items-center min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="border-2 border-gray-900/10 p-4">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="flex justify-center items-center rounded-full">
                <Camera />
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Name
                  </label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="john doe"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Mobile No.
                  </label>
                  <div>
                    <input
                      type="text"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="ex:9130072238"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Age
                  </label>
                  <div>
                    <input
                      type="text"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="ex: 22"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Qualification
                  </label>
                  <div>
                    <input
                      type="text"
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      placeholder="BCS"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Email address
                  </label>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="anc12@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Upload Image
                  </label>
                  <div>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      placeholder="anc12@gmail.com"
                      value={form.image}
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                        setForm((prevForm) => ({
                          ...prevForm,
                          image: e.target.value,
                        }));
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Street address
                  </label>
                  <div>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123, Elm Street, Apt 4B, USA"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-4 items-center justify-end gap-x-6">
                <button
                  className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>

        {showPopup && (
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Save Info
                    </h3>
                    <div>
                      <p className="text-sm text-gray-500">
                        Personal Information submitted
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClosePopup}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
}

export default ProfileFill;

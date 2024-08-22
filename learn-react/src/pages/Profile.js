import React, { useState } from "react";
import Camera from "../components/Webcam";

function ProfileFill() {
  const [showPopup, setShowPopup] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // To toggle options
  const [showCamera, setShowCamera] = useState(false); // To toggle camera component
  const [img, setImg] = useState(null); // Store captured or uploaded image

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    qualification: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    // Append the captured image if available
    if (img) {
      const uniqueFilename = `image-${Date.now()}.png`;
      formData.append("image", img, uniqueFilename);
    }

    console.log("fORM DATA: ", formData);

    fetch("rest-api-rose.vercel.app/api/single", {
      // Note the `/api` prefix
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

  const handleOptionSelect = (option) => {
    if (option === "take-photo") {
      // Trigger the Camera component
      setShowCamera(true);
      setShowOptions(false);
    } else if (option === "upload-photo") {
      // Trigger file input
      document.getElementById("fileInput").click();
      setShowOptions(false);
    } else if (option === "remove-photo") {
      // Remove the image
      setImg(null);
      setShowOptions(false);
    }
  };
  return (
    <>
      <div className="flex justify-center mx-auto items-center min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="border-2 border-gray-900/10 p-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <div className="flex justify-center items-center rounded-full relative">
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Profile"
                    className="rounded-full w-40 h-40 object-cover"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <button
                  type="button"
                  className="absolute bottom-6 right-15 left-18 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <i className="fas fa-camera text-white">+</i>
                </button>
              </div>

              {showOptions && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
                  <button
                    type="button"
                    className="block w-full text-left p-2 text-sm hover:bg-gray-100"
                    onClick={() => handleOptionSelect("take-photo")}
                  >
                    Take Photo
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left p-2 text-sm hover:bg-gray-100"
                    onClick={() => handleOptionSelect("upload-photo")}
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left p-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => handleOptionSelect("remove-photo")}
                  >
                    Remove Photo
                  </button>
                </div>
              )}

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />

              {showCamera && (
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="m-2 px-2 py-1 bg-red-600 text-white rounded-full"
                        onClick={() => setShowCamera(false)}
                      >
                        X
                      </button>
                    </div>
                    <Camera
                      setCapturedImage={(blob) => {
                        setImg(blob);
                        setShowCamera(false);
                      }}
                    />
                  </div>
                </div>
              )}
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
                      className="w-80 py-1 px-3 border rounded-md outline-none"
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
                      className="w-80 py-1 px-3 border rounded-md outline-none"
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
                      className="w-80 py-1 px-3 border rounded-md outline-none"
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
                      className="w-80 py-1 px-3 border rounded-md outline-none"
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
                      className="w-80 py-1 px-3 border rounded-md outline-none"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                  >
                    Street address
                  </label>
                  <div>
                    <input
                      type="textarea"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="P24, Raj Niwas, Anand nagar, Anandgaon"
                      className="w-80 py-1 px-3 border rounded-md outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-orange-600 px-3 py-2 mt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Popup code */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Form Submitted Successfully
            </h2>
            <p>Your details have been saved.</p>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileFill;

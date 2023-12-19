import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCartDependency, UserProfileContext } from "../../App";
import CustomAlert from "../../component/CustomAlert";
import IMAGES from "../../assets";
import axios from "axios";

const getProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile";
const updateProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/edit-profile";
const accessToken = () => localStorage.getItem("token");

function PersonalInfo() {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      ...values,
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
    });
  }, [profile]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (uploadedFile) {
        const image = await getCloudinaryURL(uploadedFile.file);

        const dataToSend = { ...profile, ...values, avatar: image };

        fetch(updateProfile, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + accessToken(),
          },
          body: JSON.stringify(dataToSend),
        })
          .then((res) => {
            if (res.status == 200) {
              setAlert({
                ...alert,
                open: true,
                severity: "success",
                title: "Profile Updated Successfully",
              });

              setCartDep(1);
            }
          })
          .catch((error) => {
            setAlert({
              ...alert,
              open: true,
              severity: "error",
              title: "Failed to update profile",
              message: error.message,
            });
          });
      } else {
        const dataToSend = { ...profile, ...values };

        fetch(updateProfile, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + accessToken(),
          },
          body: JSON.stringify(dataToSend),
        })
          .then((res) => {
            if (res.status == 200) {
              setAlert({
                ...alert,
                open: true,
                severity: "success",
                title: "Profile Updated Successfully",
              });

              setCartDep(1);
            }
          })
          .catch((error) => {
            setAlert({
              ...alert,
              open: true,
              severity: "error",
              title: "Failed to update profile",
              message: error.message,
            });
          });
      }
    } catch (err) {
      setAlert({
        ...alert,
        open: true,
        severity: "error",
        title: "Something went wrong",
        message: err.message,
      });
    }
  };

  // ** For Image Selection
  const hiddenFileInput = useRef(null);

  const handleSelectImage = (e) => {
    hiddenFileInput.current.click();
  };

  const presetKey = "nwanxche_preset";
  const cloudName = "dikleyjwz";

  const [uploadedFile, setUploadedFile] = useState();

  const handleFileEvent = (e) => {
    let chosenFile;

    const file = e.target.files[0];
    const name = file.name;
    const url = URL.createObjectURL(file);
    chosenFile = { file, name, url };

    setUploadedFile(chosenFile);
    setValues({ ...values, avatar: chosenFile.url });
  };

  // ** convert selected images to cloudinary url
  const getCloudinaryURL = async (image) => {
    let imageFile;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetKey);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    imageFile = data.secure_url;

    return imageFile;
  };

  return (
    <>
      {alert && alert.severity && (
        <CustomAlert
          open={alert.open}
          details={alert}
          close={handleCloseAlert}
        />
      )}

      <form className="px-4 py-8 md:px-10 lg:px-[100px] xl:px-[120px] md:py-4">
        <div className="flex flex-col-reverse xl:flex-row gap-6 xl:gap-12 justify-between items-start">
          <div className="w-full xl:flex-1">
            <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
              <label className="text-sm font-medium" htmlFor="firstName">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange("firstName")}
                className="capitalize w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
              />
            </div>

            <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
              <label className="text-sm font-medium" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange("lastName")}
                className="capitalize w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
              />
            </div>

            <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
              <label className="text-sm font-medium" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange("username")}
                className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
              />
            </div>

            <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
              <label className="text-sm font-medium" htmlFor="email">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
              />
            </div>

            <div className="flex flex-col gap-3 mb-4 lg:gap-4 lg:mb-5">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password || ""}
                  onChange={handleChange("password")}
                  className="w-full h-11 lg:h-14 px-6 lg:px-11 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="outline-0 text-gray-600 absolute top-1/4 right-[3%] cursor-pointer"
                >
                  {showPassword ? (
                    <i className="bx bx-hide bx-sm text-[#6D7D8B]"></i>
                  ) : (
                    <i className="bx bx-show bx-sm text-[#6D7D8B]"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <Link to="" className="text-sm text-green">
                Change Password
              </Link>
            </div>
          </div>

          <div className="space-y-4 w-[150px] xl:w-[200px]">
            <div className="w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] border flex justify-center items-center rounded bg-gray-300">
              {!values.avatar ? (
                <img
                  src={IMAGES.user}
                  alt="user"
                  className="max-w-full max-h-full rounded"
                />
              ) : (
                <img
                  src={values.avatar}
                  alt={values.firstName}
                  className="w-full h-full max-w-full max-h-full rounded"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleFileEvent}
            />

            <div>
              <button
                type="button"
                className="w-full bg-green outline-0 font-medium text-white text-sm px-4 py-2 rounded capitalize"
                onClick={handleSelectImage}
              >
                {values.avatar ? "change photo" : "upload photo"}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center my-8">
          <button
            type="button"
            className="bg-transparent outline-0 font-semibold text-green tracking-tight underline lg:text-lg"
            onClick={handleSubmit}
          >
            {" "}
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}

export default PersonalInfo;

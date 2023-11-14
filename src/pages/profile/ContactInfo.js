import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCartDependency, UserProfileContext } from "../../App";
import CustomAlert from "../../component/CustomAlert";

const getProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/my-profile";
const updateProfile =
  "https://apps-1.lampnets.com/ecommb-staging/profiles/edit-profile";
const accessToken = () => localStorage.getItem("token");

function ContactInfo() {
  const [profile, setProfile] = useContext(UserProfileContext);
  const [cartDep, setCartDep] = useContext(UserCartDependency);
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    title: "",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      ...values,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      phoneNumber: toNumber(profile.phoneNumber),
    });
  }, [profile]);

  const toNumber = (str) => {
    if (typeof str === "number") {
      return str;
    }

    return parseInt(str);
  };

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: "Nigeria" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setStates(result.data.states);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [location.pathname, cartDep]);

  useEffect(() => {
    if (values.state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ country: "Nigeria", state: values.state }),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setCities(result.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [values.state]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

          setCartDep(2);
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
        <div className="flex flex-col gap-3 mb-6 lg:gap-4 lg:mb-5">
          <label className="text-sm font-medium" htmlFor="shippingAddress">
            Shipping Address
          </label>
          <textarea
            rows={3}
            name="shippingAddress"
            value={values.address}
            onChange={handleChange("address")}
            className="w-full rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base resize-none"
          ></textarea>
        </div>

        <div className="flex justify-between gap-6 mb-6 w-full">
          <div className="flex flex-col gap-3 w-full lg:gap-4">
            <label className="text-sm font-medium" htmlFor="state">
              State
            </label>
            <select
              name="state"
              value={values.state}
              onChange={handleChange("state")}
              className="w-full h-11 lg:h-14 xl:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
            >
              <option value="">None</option>
              {states.length > 0 &&
                states.map((state, i) => {
                  return (
                    <option key={i} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full lg:gap-4">
            <label className="text-sm font-medium" htmlFor="city">
              City
            </label>

            <select
              name="city"
              value={values.city}
              onChange={handleChange("city")}
              className="w-full h-11 lg:h-14 xl:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
            >
              <option value="">None</option>
              {cities.length > 0 &&
                cities.map((city, i) => {
                  return (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6 lg:gap-4">
          <label className="text-sm font-medium" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            className="w-full h-11 lg:h-14 lg:w-64 rounded bg-[#ECF3F9] p-3 outline-0 font-normal text-sm lg:text-base"
          />
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

export default ContactInfo;

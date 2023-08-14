import React, { useMemo, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShippingAddress,
  ShippingMethod,
  PaymentMethod,
  OrderReview,
} from "../../views/payment";
import { LoginContext } from "../../App";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#009F7F",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#009F7F",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#009F7F",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#009F7F",
    zIndex: 1,
    fontSize: 18,
    transition: "all 0.6s ease-in-out",
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    transition: "all 0.6s ease-in-out",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const steps = ["Welcome", "Shipping method", "Order"];

function CustomizedSteppers({ active }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={active}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <p
                className="font-normal text-[10px]"
                style={{
                  fontFamily: "Montserrat",
                  color: `${active >= index ? "#009F7F" : "#D7D8DA"}`,
                  fontWeight: `${active >= index ? 500 : 400}`,
                }}
              >
                {label}
              </p>
              {/* {label} */}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

function Payment() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [componentToRender, setComponentToRender] =
    useState("shipping-address");
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });

  const nextPage = (text) => {
    setComponentToRender(text);
  };

  const goBack = () => {
    if (
      componentToRender !== "shipping-method" ||
      componentToRender !== "shipping-address"
    ) {
      return setComponentToRender("shipping-method");
    } else if (componentToRender === "shipping-method") {
      return setComponentToRender("shipping-address");
    }
  };

  useEffect(() => {
    if (componentToRender === "shipping-address") {
      setActiveStep(0);
    } else if (componentToRender === "shipping-method") {
      setActiveStep(1);
      // } else if (componentToRender === "payment-method") {
      //   setActiveStep(2);
    } else {
      setActiveStep(2);
    }
  }, [componentToRender]);

  const conditions = useMemo(() => {
    if (componentToRender === "shipping-address") {
      return <ShippingAddress goTo={nextPage} />;
    } else if (componentToRender === "shipping-method") {
      return <ShippingMethod goTo={nextPage} back={goBack} />;
      // } else if (componentToRender === "payment-method") {
      //   return <PaymentMethod goTo={nextPage} back={goBack} />;
    } else {
      return <OrderReview back={goBack} />;
    }
  }, [componentToRender]);

  const heading = useMemo(() => {
    if (componentToRender === "shipping-address") {
      return "Where should we send the order?";
    } else if (componentToRender === "shipping-method") {
      return "How should we send the order?";
      // } else if (componentToRender === "payment-method") {
      //   return "Make payment for the order?";
    } else {
      return "Confirm and enjoy your order";
    }
  }, [componentToRender]);

  return (
    <div className="my-20 p-6 space-y-10 md:w-3/4 lg:w-3/5 md:mx-auto md:space-y-14">
      <h3 className="text-2xl font-bold text-dark-blue text-center mb-6 lg:text-[32px] lg:mb-8">
        {heading}
      </h3>

      <CustomizedSteppers active={activeStep} />

      <div
        className="w-full px-4 py-6 rounded-3xl md:p-8 lg:p-10"
        style={{ boxShadow: "0px 3px 6px 0px rgba(18, 29, 60, 0.15)" }}
      >
        {conditions}
      </div>
    </div>
  );
}

export default Payment;

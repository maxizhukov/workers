import customHistory from "../customHistory";
import {notification} from "antd";
import i18n from "../i18next";

export function apiErrorHandler(status:number, error?: any, showErrorNotification?: boolean) {
  let previousPath = "";

  // If error comes from error page change path (needed for reload button in error page)
  if (window.location.pathname !== "/server-error" && previousPath !== "/error") {
    previousPath = window.location.pathname;
  }
  if (status === 404 && window.location.pathname !== "/error") {
    customHistory.push(`/error${previousPath ? `?pathname=${previousPath}` : ""}`);
    return true;
  } else if (status === 500 || status === 0 && window.location.pathname !== "/server-error") {
    customHistory.push(`/server-error${previousPath ? `?pathname=${previousPath}` : ""}`);
    return true;
  } else if (status === 401) {
    const reqUrlType = error.request.responseURL?.split("/")[4];
    // TODO Remove all stored values logout user
    sessionStorage.clear();
    if (reqUrlType === "contractor") {
      customHistory.push("/contractor/auth/login");
    } else {
      customHistory.push("/auth");
    }
    return true;
  } else {
    console.log(error.response.data);
    switch (error.response.status) {
    case 400:
      notification.error({
        message: i18n.t("errors.notificationTitles.internal"),
        description: error.response.data?.error?.details[0]?.message,
      });
      return {
        status: false,
        data: error.response.data?.error?.details[0]?.message
      };
    case 422:
      if (showErrorNotification) {
        notification.error({
          message: i18n.t("errors.notificationTitles.validation"),
          description: i18n.t(`errors.messages.${error.response.data.message}`),
        });
      }
      return {
        status: false,
        data: error.response.data.message
      };
    }
    return false;
  }
}

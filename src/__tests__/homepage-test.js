import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import { Homepage } from "../Homepage";

const homepage = shallow(<Homepage />);
jest.mock('axios');
describe("Homepage tests", () => {
  it("sign up should be disabled", () => {
    expect(homepage.find("#signup-button").prop("disabled")).toBeTruthy();
  });
  it("should not enable sign up button until all requirements are met", () => {
    homepage
      .find("#register-username")
      .simulate("change", { target: { value: "user" } });
    expect(homepage.find("#signup-button").prop("disabled")).toBeTruthy();
    homepage
      .find("#register-password")
      .simulate("keyUp", { target: { value: " " } });
    homepage
      .find("#register-password")
      .simulate("change", { target: { value: "Something*124" } });
    homepage
      .find('#register-password')
      .simulate("keyUp", { target: { value: 'Something*1243' } });
    expect(homepage.find("#signup-button").prop("disabled")).toBeFalsy();
  });
  it("should disable signup button", () => {
    homepage
      .find("#register-password")
      .simulate("change", { target: { value: "123" } });
    homepage
      .find("#register-password")
      .simulate("keyup", { target: { value: "1234" } });
  });
  it("should call axios properly on register", () => {
    const registerUsername = homepage
      .find("#register-username")
      .prop("value");

    const registerPassword = homepage
      .find("#register-password")
      .prop("value");
    homepage
      .find("#signup-button")
      .simulate('click');
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    });
  });
  it("should call axios properly on login", () => {
    homepage.find("#login-username").simulate("change", { target: { value: "loginuser" } });
    homepage.find("#login-password").simulate("change", { target: { value: "loginpass" } });

    const loginUsername = homepage.find('#login-username').prop('value');
    const loginPassword = homepage.find('#login-password').prop('value');
    homepage.find('#login-button').simulate('click');
    expect(axios).toHaveBeenCalledTimes(2);
    expect(axios).toHaveBeenLastCalledWith({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: '/login',
    });
  });
});

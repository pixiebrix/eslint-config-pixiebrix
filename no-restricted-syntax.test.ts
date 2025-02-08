/** @file File that verifies rules in `no-restricted-syntax`. Each line MUST be preceded by `eslint-disable-next-line`, which acts as an "expect" assertion */

/* Unrelated issues */
/* eslint-disable import/no-duplicates */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
declare const chrome;
declare const browser;
declare const jest;

// eslint-disable-next-line no-restricted-syntax
import classnames from "classnames";
import cx from "classnames"; // Ok

// eslint-disable-next-line no-restricted-syntax
export const id = crypto.randomUUID();

// eslint-disable-next-line no-restricted-syntax
export const alertMock = alert as jest.Mock<typeof alert>;

// eslint-disable-next-line no-restricted-syntax
export const alertMockedFunction = alert as jest.MockedFunction<typeof alert>;

// eslint-disable-next-line no-restricted-syntax
export const mockPromise = jest.fn().mockResolvedValue(undefined);

// eslint-disable-next-line no-restricted-syntax
export type MyObject = Record<string, unknown>;

const selection = getSelection(); // Ok
// eslint-disable-next-line no-restricted-syntax
export const range = selection?.getRangeAt(0).startContainer;
export const string = selection?.toString(); // Ok

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
browser.runtime.getURL("options.html");
chrome.runtime.getURL("options.html");

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
browser.tabs.query({ active: true });
chrome.tabs.query({ active: true });

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
browser.scripting.getRegisteredContentScripts();
chrome.scripting.getRegisteredContentScripts();

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
chrome.runtime.sendMessage("good soup");
browser.runtime.sendMessage("good soup");

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
chrome.tabs.sendMessage(1, "u e e a i");
browser.tabs.sendMessage(1, "u e e a i");

// eslint-disable-next-line no-restricted-syntax -- necessary to define rule
chrome.runtime.onMessage.addListener(() => undefined);
browser.runtime.onMessage.addListener(() => undefined);

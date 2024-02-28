/** @file File that verifies rules in `no-restricted-syntax`. Each line MUST be preceded by `eslint-disable-next-line`, which acts as an "expect" assertion */

/* Unrelated issues */
/* eslint-disable import/no-duplicates */
/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// eslint-disable-next-line no-restricted-syntax
import classnames from "classnames";
import cx from "classnames";

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

/**
 * @file File that verifies local rules.
 * Each line MUST be preceded by `eslint-disable-next-line`, unless it's the "valid" version
 */

// @ts-expect-error -- Testing eslint only
// eslint-disable-next-line no-restricted-imports
import { useSyncExternalStore } from "use-sync-external-store";
// @ts-expect-error -- Testin eslint only
import { useSyncExternalStore as xx } from "use-sync-external-store/shim"; /* Valid */

import { createContext } from 'react';

/**
 * We add a react context here to keep the function references of
 * the varying functionalities from the consumer app of the shared
 * components, viz. either the electron desktop app OR the web application,
 * as they will have their own way of handling the interactions.
 *
 * Hence, in order to avoid prop drilling, we save those memoized references
 * from the consumer app in the closest common parent (<Report />),
 * where this context is instantiated, Because these interactions are required
 * at considerably deep nested levels of component heirarchy.
 */

export const ReportContext = createContext(null);

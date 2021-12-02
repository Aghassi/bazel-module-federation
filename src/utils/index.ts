import * as path from "path";

/**
 * Get the route identifier, where '/' translates to 
 * @param path Request path
 * @returns Route identifier
 */
export const getIdentifier = (path?: string): string =>
  path === "/" || typeof path === "undefined" ? "default" : path;

/**
 * Generates script that loads a routes remote entry
 * 
 * @param remoteEntryPath req.uri from original route
 * @param routeManifest The route manifest json
 * @returns Script tag that can load a remoteEntry
 */
export const getRemoteEntryScript = (remoteEntryPath, routeManifest: Record<string, string>): string => {
  const identifier = getIdentifier(remoteEntryPath);
  const manifestIndex = remoteEntryPath.substring(1) || "/";

  return `<script src="${process.env.CDN_HOST}${path.join(
    "/",
    identifier,
    routeManifest[manifestIndex]
  )}"></script>`;
};

export default {
    getIdentifier,
    getRemoteEntryScript
}
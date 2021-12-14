import * as path from "path";

/**
 * Get the route identifier, where '/' translates to 
 * @param reqPath Request path
 * @returns Route identifier
 */
export const getIdentifier = (reqPath?: string): string =>
  reqPath === "/" || typeof reqPath === "undefined" ? "default" : reqPath;

/**
 * Generates script that loads a routes remote entry
 * 
 * @param remoteEntryPath req.uri from original route
 * @param routeManifest The route manifest json
 * @returns Script tag that can load a remoteEntry, null if route not found
 */
export const getRemoteEntryScript = (remoteEntryPath: string, routeManifest: Record<string, string>, cdnUrl: string): string | null => {
  const identifier = getIdentifier(remoteEntryPath);
  const manifestIndex = remoteEntryPath.substring(1) || "/";

  if(!routeManifest[manifestIndex]) {
    return null
  }

  return `<script src="${cdnUrl}${path.join(
    "/",
    identifier,
    routeManifest[manifestIndex]
  )}"></script>`;
};

export default {
    getIdentifier,
    getRemoteEntryScript
}
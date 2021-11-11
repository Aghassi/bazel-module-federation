import getIdentifier from "./getIdentifier"

export default ({ path }) => {
    const { routeManifest } = window
    const identifier = getIdentifier(path)
    const remoteEntry = `${routeManifest.CDN_HOST}/${identifier}/${routeManifest[identifier]}`

    const script = document.createElement('link');

    script.href = remoteEntry;
    script.rel = 'preload';

    document.head.appendChild(script);
}
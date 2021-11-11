import getIdentifier from "./getIdentifier"

export default ({ path }) => {
    const { routeManifest } = window
    const identifier = getIdentifier(path)
    const remoteEntry = `${routeManifest.CDN_HOST}/${identifier}/${routeManifest[identifier]}`

    const script = document.createElement('script');

    script.src = remoteEntry;

    document.head.appendChild(script);
}
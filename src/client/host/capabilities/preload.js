import getIdentifier from "./getIdentifier"

export default ({ path }) => {
    const { routeManifest } = window
    const identifier = getIdentifier(path)
    const remoteEntry = `/preload/${identifier}/${routeManifest[identifier]}`

    const script = document.createElement('link');

    script.href = remoteEntry;
    script.rel = 'preload';

    document.head.appendChild(script);
}
import React from "react";
import preload from "./capabilities/preload";

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      // When this loads, it seems like this state is not updated...
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      // ... but these will update fine in an error case (try blocking remoteEntry in network)
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

export default function DynamicComponent(props) {
  if (!window[props.system.scope]) {
    const { ready, failed } = useDynamicScript({
      url: props.system && props.system.url,
    });

    if (!props.system) {
      return <h2>No system specified</h2>;
    }

    if (!ready) {
      return <h2>Loading dynamic script: {props.system.url}</h2>;
    }

    if (failed) {
      return <h2>Failed to load dynamic script: {props.system.url}</h2>;
    }
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component preload={preload} />
    </React.Suspense>
  );
}

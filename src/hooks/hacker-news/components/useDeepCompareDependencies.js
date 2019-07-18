import React from 'react';
import shallowequal from 'shallowequal';

export default function useDeepCompareDependencies(dependencies) {
    const ref = React.useRef();

    if (!shallowequal(dependencies, ref.current)) {
        ref.current = dependencies;
    }

    return ref.current;
}

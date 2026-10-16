import React, { useState, useEffect, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import ProceduralOxford from './ProceduralOxford';

// Path to external GLB model. To swap in a real 3D model, place your file in /public/shoe.glb
export const DEFAULT_MODEL_PATH = '/shoe.glb';

function GlbShoe({ path, ...props }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene.clone()} {...props} />;
}

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.info('Shoe GLB fallback active: rendering procedural Oxford.', error?.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Universal Shoe Component
 * Attempts to load the custom GLB model at modelPath (/shoe.glb).
 * Seamlessly falls back to ProceduralOxford if no GLB exists.
 */
export function Shoe({ modelPath = DEFAULT_MODEL_PATH, ...props }) {
  const [glbAvailable, setGlbAvailable] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Check if GLB file actually exists and isn't Vite's SPA fallback HTML
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        const contentType = res.headers.get('content-type') || '';
        // If file exists and is binary/gltf/octet-stream, not html
        if (res.ok && !contentType.includes('text/html')) {
          setGlbAvailable(true);
        } else {
          setGlbAvailable(false);
        }
      })
      .catch(() => {
        if (isMounted) setGlbAvailable(false);
      })
      .finally(() => {
        if (isMounted) setChecked(true);
      });

    return () => {
      isMounted = false;
    };
  }, [modelPath]);

  if (!checked || !glbAvailable) {
    return <ProceduralOxford {...props} />;
  }

  return (
    <ModelErrorBoundary fallback={<ProceduralOxford {...props} />}>
      <Suspense fallback={<ProceduralOxford {...props} />}>
        <GlbShoe path={modelPath} {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

export default Shoe;

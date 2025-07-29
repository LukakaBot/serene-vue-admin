import setupBucket from './bucket';
import setupNaiveDiscrete from './naiveDiscrete';

function setupPlugins() {
  setupBucket();
  setupNaiveDiscrete();
}

export default setupPlugins;
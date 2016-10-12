import config from '../config';

export function cleanArtifacts (artifacts) {
  return artifacts.map(artifact => {
    if (artifact.image_url && artifact.image_url.indexOf('http') !== 0) {
      artifact.image_url = config.imageUrlBase + artifact.image_url;
    }
    return artifact;
  });
}

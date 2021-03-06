import { Scene } from '../types/routing';
import { ErrorCode } from '../ErrorCode.enum';

export function getPathWithParams(scene: Scene): string {
  if (!scene.params) {
    return scene.path;
  }

  let pathWithParams: string = scene.path;
  const paramsAsString = Object.keys(scene.params);

  paramsAsString.forEach((param: string) => {
    pathWithParams = pathWithParams.replace(`:${param}`, scene.params[param]);
  });

  return pathWithParams;
}

export const verifyIfPathIsUnique = (
  path: string,
  existingPaths: string[],
): string => {
  const isPathUnique = !existingPaths.includes(path);

  if (!isPathUnique) {
    throw Error(ErrorCode.RoutingDuplicatePath);
  }

  return path;
};

// CORRECT
// getPathWithParams({
//   path: PostRoute.Detail,
//   params: { postId: '4' },
// });

// getPathWithParams({
//   path: UserRoute.List,
// });

// getPathWithParams({
//   path: UserRoute.List,
//   params: undefined,
// });

// // ERROR
// getPathWithParams({
//   path: PostRoute.Detail,
//   params: undefined,
// });

// getPathWithParams({
//   path: PostRoute.Detail,
// });

// getPathWithParams({
//   path: UserRoute.List,
//   params: { wrongParam: 'value' },
// });

import { useNavigate } from 'react-router-dom';
import { Routes, ParamsByRoute } from './Routes';

export const routeWithParams = (route: Routes) => {
  const params = ParamsByRoute[route] as string[] | undefined;

  if (!params) {
    return route;
  }

  return params.reduce((acc: string, param: string) => {
    return `${acc}/:${param}`;
  }, route);
};

export const useNavigateWithParams = () => {
  const navigate = useNavigate();

  return <Params extends Record<string, string>>(
    route: Routes,
    params: Params
  ) => {
    const routeWithParams = Object.keys(params).reduce(
      (acc: string, param: string) => {
        return `${acc}/${params[param]}`;
      },
      route
    );

    navigate(routeWithParams);
  };
};

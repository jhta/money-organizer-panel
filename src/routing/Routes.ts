export enum Routes {
  Main = '/',
  SubmitReport = '/submit-report',
  AddCategories = '/add-categories',
  FinishReport = '/finish-report',
  Login = '/login',
  Reports = '/reports',
  /**
   * should include the parameter 'id' in the path
   */
  Report = '/report',
}

export interface RouteParams {
  [Routes.Report]: { id: string };
}

export const ParamsByRoute: Record<string, string[]> = {
  [Routes.Report]: ['id'],
};

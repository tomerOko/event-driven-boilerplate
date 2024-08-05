export interface UtilsStateParams {
  JWT_SECRET: string;
  SERVICE_NAME: string;
  IS_PROD: boolean;
}

export class UtilsState {
  private static JWT_SECRET: string = '';
  private static SERVICE_NAME: string = '';
  private static IS_PROD: boolean = false;

  static setParams(params: UtilsStateParams) {
    this.JWT_SECRET = params.JWT_SECRET;
    this.SERVICE_NAME = params.SERVICE_NAME;
    this.IS_PROD = params.IS_PROD;
  }

  static getJwtSecret(): string {
    return this.JWT_SECRET;
  }

  static getServiceName(): string {
    return this.SERVICE_NAME;
  }

  static getIsProd(): boolean {
    return this.IS_PROD;
  }
}

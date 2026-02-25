export const DEV_KEY = "DEV";
export const QA_KEY = "QA";
export const PEREIRA_KEY = "Pereira";
export const MEDELLIN_KEY = "Medellin";

export interface EnvironmentConfig {
  production: boolean;
  baseUrl: string;
  imageUrl: string;
}

const environments: Record<string, EnvironmentConfig> = {
  [PEREIRA_KEY]: {
    production: false,
    baseUrl:
      "https://api.gymconnect.com.co/training-connect-services/web/app_dev.php/api/",
    imageUrl:
      "https://api.gymconnect.com.co/training-connect-services/web/img/",
  },
  [DEV_KEY]: {
    production: false,
    baseUrl: "http://localhost:8000/app_dev.php/api/",
    imageUrl: "http://localhost:8000/app_dev.php/img/",
  },
  [QA_KEY]: {
    production: false,
    baseUrl: "https://www.connect.cobrashields.com/app_dev.php/api/",
    imageUrl: "https://www.connect.cobrashields.com/img/",
  },
  [MEDELLIN_KEY]: {
    production: false,
    baseUrl:
      "https://www.connect-prod.cobrashields.com/app_prod_medellin.php/api/",
    imageUrl:
      "https://www.connect-prod.cobrashields.com/app_prod_medellin.php/img/",
  },
};

let currentEnvironmentKey = PEREIRA_KEY;

export const setEnvironmentKey = (key: string) => {
  currentEnvironmentKey = key;
};

export const getEnvironmentKey = () => currentEnvironmentKey;

export const getEnvironment = (): EnvironmentConfig => {
  return (
    environments[currentEnvironmentKey] ?? environments[PEREIRA_KEY]
  );
};

export const environmentOptions = [
  { key: PEREIRA_KEY, label: "Colombia" },
  { key: DEV_KEY, label: "Desarrollo" },
  { key: QA_KEY, label: "Pruebas" },
  { key: MEDELLIN_KEY, label: "Medellín" },
];

export const EnvConfig = {
  dev: {
    baseURL: "https://droptaxie.in"
  },
  qa: {
    baseURL: "https://droptaxie.in"
  }
};

export const getEnv = () => {
  const env = process.env.ENV || "dev";
  return EnvConfig[env as keyof typeof EnvConfig];
};

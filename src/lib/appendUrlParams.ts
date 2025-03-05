const appendUrlParams = (payload: Record<string, string>): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(payload).forEach((item: any) => {
    const [key, value] = item;
    if (value) {
      try {
        value.forEach((element: string) => {
          params.append(key, element);
        });
      } catch (e: any) {
        params.append(key, value);
      }
    }
  });
  return params;
};

export default appendUrlParams;

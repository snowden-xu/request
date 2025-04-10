export function toFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, val]) => {
    formData.append(key, val);
  });
  return formData;
}

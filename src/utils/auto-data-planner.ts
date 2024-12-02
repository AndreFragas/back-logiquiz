export function AutoDataPlanner(
    originalData: Record<string, any>,
    updatedData: Record<string, any>,
  ) {
    const keys = Object.keys(updatedData);
    keys.forEach((key: string) => {
      originalData[key] = updatedData[key];
    });

    return originalData;
  }
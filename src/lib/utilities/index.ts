export function blob_to_json<T>(
  blob: Blob,
  callback: (result: T | null) => void,
): void {
  if (blob instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        callback(JSON.parse(reader.result as string));
      } catch (error) {
        console.error('Error parsing JSON:', error);
        callback(null);
      }
    };
    reader.readAsText(blob);
  } else {
    console.log('Not blob', blob);
    callback(null);
  }
}

export function handleResponseVoid(res: Response) {
  if (!res || !res.ok) {
    return console.error(
      `Failed to send request Status: ${res?.status}`,
      res.headers,
    );
  }
}

export async function handleResponse<T>(res: Response): Promise<T | void> {
  if (!res || !res.ok) {
    return console.error(
      `Failed to send request Status: ${res?.statusText}`,
      res.headers,
    );
  }
  return res.json();
}

export async function handleResponseList<T>(res: Response): Promise<T[]> {
  if (!res || !res.ok) {
    console.error(
      `Failed to send request Status: ${res?.statusText}`,
      res.headers,
    );
    return [];
  }
  return res.json();
}

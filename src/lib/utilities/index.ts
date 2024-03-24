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

export function handleResponseVoid(r: Response) {
  if (!r || !r.ok) {
    return console.error(
      `Failed to send request Status: ${r?.status}`,
      r.headers,
    );
  }
}

export async function handleResponse<T>(r: Response): Promise<T | void> {
  if (!r || !r.ok) {
    return console.error(
      `Failed to send request Status: ${r?.statusText}`,
      r.headers,
    );
  }
  return r.json();
}

export async function handleResponseList<T>(r: Response): Promise<T[]> {
  if (!r || !r.ok) {
    console.error(`Failed to send request Status: ${r?.statusText}`, r.headers);
    return [];
  }
  return r.json();
}

export async function handleResponseBoolean(r: Response): Promise<boolean> {
  if (!r || !r.ok) {
    console.error(`Failed to send request Status: ${r?.statusText}`, r.headers);
    return false;
  }
  return true;
}

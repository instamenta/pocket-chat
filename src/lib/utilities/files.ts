// @ts-ignore
import { BucketFunctions } from '@edgestore/react/src/createNextProxy';

export async function importImages(
  edgestore: BucketFunctions,
  images: FileList,
) {
  const urls: string[] = [];

  await Promise.all(
    Array.from(images).map(async (img) => {
      try {
        const res = await edgestore.publicFiles.upload({
          file: img,
          options: undefined,
        });
        urls.push(res.url);
      } catch (error) {
        return console.error('Failed to upload images to Edgestore', error);
      }
    }),
  );

  return urls;
}

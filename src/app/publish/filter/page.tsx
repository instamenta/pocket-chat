'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useEdgeStore } from '@/lib/store/edgestore';

export default function ImageModifier() {
  const { edgestore } = useEdgeStore();

  const [imageSrc, setImageSrc] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [filterSettings, setFilterSettings] = useState({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    hueRotate: 0,
    sepia: 0,
    grayscale: 0,
    invert: 0,
    blur: 0,
  });

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterSettings({
      ...filterSettings,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target!.result!.toString());
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const saveImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.onload = async () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = `contrast(${filterSettings.contrast}%) brightness(${filterSettings.brightness}%) saturate(${filterSettings.saturate}%) hue-rotate(${filterSettings.hueRotate}deg) sepia(${filterSettings.sepia}%) grayscale(${filterSettings.grayscale}%) invert(${filterSettings.invert}%) blur(${filterSettings.blur}px)`;
        ctx.drawImage(image, 0, 0);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'filtered-image.png', {
            type: 'image/png',
          });
          const uploadResult = await edgestore.publicFiles.upload({ file });

          console.log(uploadResult.url);
        }, 'image/png');
      };
      image.src = imageSrc;
    }
  };

  const _f = filterSettings;

  const filterStyle = `contrast(${_f.contrast}%) brightness(${_f.brightness}%) saturate(${_f.saturate}%) hue-rotate(${_f.hueRotate}deg) sepia(${_f.sepia}%) grayscale(${_f.grayscale}%) invert(${_f.invert}%) blur(${_f.blur}px)`;

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <section className="aspect-square w-full overflow-hidden">
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {imageSrc && (
          <img
            src={imageSrc}
            className="aspect-square w-full object-none"
            alt="Preview"
            style={{ filter: filterStyle }}
          />
        )}
      </section>
      <section className="flex w-full justify-center border-y-2 border-y-gray-500 py-2">
        <input type="file" onChange={handleImageChange} />
        <button
          onClick={saveImage}
          className="px-2 font-medium text-blue-600 outline outline-2 outline-blue-600 transition-all hover:bg-blue-600 hover:text-white"
        >
          Save Image
        </button>
      </section>
      <section className="px-4 pt-4">
        {Object.keys(filterSettings).map((key) => (
          <div
            key={key}
            className="mb-3 flex flex-col rounded-br-md rounded-tl-md outline outline-1 outline-gray-400"
          >
            <div className="flex w-full flex-row justify-between px-4 pt-1 text-sm font-medium capitalize">
              <div className="w-full">
                <label htmlFor={key}>{key}</label>
              </div>
              <div className="w-full text-right">
                <span>
                  {
                    // @ts-ignore
                    filterSettings[key] + ' %'
                  }
                </span>
              </div>
            </div>
            <div className="w-full px-4 pb-1">
              <input
                className="range-track:bg-gray-300 h-2 w-full appearance-none rounded bg-transparent px-4 outline-none"
                type="range"
                id={key}
                name={key}
                min="0"
                max="200"
                value={
                  // @ts-ignore
                  filterSettings[key]
                }
                onChange={handleSliderChange}
                style={{
                  background: 'linear-gradient(to right, black 20%, blue 70%)',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

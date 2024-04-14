'use client';

import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Device } from 'mediasoup-client';
import type { Transport, TransportOptions } from 'mediasoup-client/lib/Transport';
import type { Consumer } from 'mediasoup-client/lib/Consumer';
import { RtpCapabilities, RtpParameters } from 'mediasoup-client/lib/RtpParameters';

const Watch = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [consumerTransport, setConsumerTransport] = useState<Transport | null>(null);
  const [consumer, setConsumer] = useState<Consumer | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = io('http://localhost:3005');

    const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
      try {
        if (!device) {
          const device = new Device();
          await device.load({ routerRtpCapabilities });
          setDevice(device);
        }
      } catch (error) {
        console.error('loadDevice() error:', error);
      }
    };

    socket.on('connect', async () => {
      console.log('Connected to the server');

      socket.on('activeProducers', async (activeProducers) => {
        if (activeProducers.length > 0) {
          // For simplicity, consuming the first producer in the list
          const producerIdToConsume = activeProducers[0];
          // Proceed to createConsumerTransport and consume as before
          // You can also implement UI logic to let the user select which producer to watch
        }
      });

      socket.emit('getRouterRtpCapabilities', async (routerRtpCapabilities: RtpCapabilities) => {
        await loadDevice(routerRtpCapabilities);

        if (!device) return;

        socket.emit('createConsumerTransport', async (data: { error?: Error, transportOptions: TransportOptions }) => {
          if (data.error) {
            console.error(data.error);
            return;
          }

          const transport = device.createRecvTransport(data.transportOptions);
          setConsumerTransport(transport);

          transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            socket.emit('connectConsumerTransport', { transportId: transport.id, dtlsParameters }, (error: unknown) => {
              if (error) {
                errback(error as Error);
                return;
              }
              callback();
            });
          });

          // Assuming the server sends producerId(s) you want to consume in some way (e.g., via an event or API call)
          const producerId = 'The producer ID you want to consume'; // This should be dynamic
          socket.emit('consume', {
              consumerTransportId: transport.id,
              producerId,
              rtpCapabilities: device.rtpCapabilities
            },
            async (data: { id: string, kind: 'video' | 'audio', rtpParameters: RtpParameters }) => {

              const consumer = await transport.consume({
                id: data.id,
                producerId: producerId,
                kind: data.kind,
                rtpParameters: data.rtpParameters
              });
              setConsumer(consumer);

              const stream = new MediaStream();
              stream.addTrack(consumer.track);
              videoRef.current!.srcObject = stream;
              consumer.resume();
            });
        });
      });
    });

    return () => {
      consumer?.close();
      consumerTransport?.close();
      socket.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay controls className="w-screen h-screen" />
    </div>
  );
};

export default Watch;
